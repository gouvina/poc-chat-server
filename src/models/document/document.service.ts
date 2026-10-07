import { ConflictException, Injectable, NotFoundException, Query } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { Document } from "src/entities/document.entity";
import { DocumentDto } from "./dto/document.dto";
import { CreateDocumentDto } from "./dto/create-document.dto"
import { plainToInstance } from "class-transformer";

export type ScoreFilter = { value: number, relation: "gt" | "lt" }

@Injectable()
export class DocumentService {
    constructor(
        private readonly dataSource: DataSource,
        @InjectRepository(Document)
        private readonly documentRepository: Repository<Document>
    ) { }

    async getDocuments(
        scoreFilters: ScoreFilter[],
        version?: string,
        rollId?: number,
        textFilter?: string
    ): Promise<DocumentDto[]> {
        const query = this.documentRepository
            .createQueryBuilder("document")
            .leftJoinAndSelect("document.roll", "roll")

        if (version !== undefined) {
            query.andWhere("document.version = :version", { version })
        }

        if (rollId !== undefined) {
            query.andWhere("roll.id = :rollId", { rollId })
        }

        if (textFilter != undefined) {
            query.andWhere("document.text ILIKE :text", { text: `%${textFilter}%` })
        }

        if (scoreFilters.length > 0) {
            scoreFilters.forEach((filter, index) => {
                if (filter.relation === "gt") {
                    query.andWhere(`document.score >= :score${index}`, { [`score${index}`]: filter.value })
                }

                if (filter.relation === "lt") {
                    query.andWhere(`document.score <= :score${index}`, { [`score${index}`]: filter.value })
                }
            })
        }

        const documents = await query.getMany()

        return documents.map(document => plainToInstance(DocumentDto, document))
    }

    async getDocument(id: number): Promise<DocumentDto | null> {
        const document = await this.documentRepository.findOne({ where: { id } })

        if (!document) throw new NotFoundException()

        return plainToInstance(DocumentDto, document)
    }

    async createDocument(dto: CreateDocumentDto): Promise<DocumentDto> {
        const existingDocument = await this.documentRepository.findOne({ where: { id: dto.id } })

        if (existingDocument) { throw new ConflictException('A document with this Id already exists') }

        const document = await this.documentRepository.save({
            id: dto.id,
            page: dto.page,
            score: dto.score,
            version: dto.version,
            text: dto.text,
            roll: dto.roll,
        })

        return plainToInstance(DocumentDto, document)
    }
}
