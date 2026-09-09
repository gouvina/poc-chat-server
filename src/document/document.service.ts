import { ConflictException, Injectable, NotFoundException, Query } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { Document } from "./document.entity";
import { DocumentDto } from "./dto/document.dto";
import { CreateDocumentDto } from "./dto/create-document.dto"
import { plainToInstance } from "class-transformer";

@Injectable()
export class DocumentService {
    constructor(
        private readonly dataSource: DataSource,
        @InjectRepository(Document)
        private readonly documentRepository: Repository<Document>
    ) {}

    async getDocuments(
        version?: string, 
        rollId?: number
    ): Promise<DocumentDto[]> {
        const documents = await this.documentRepository.find({
            where: {
                ...(version !== undefined && { version }),
                ...(rollId !== undefined && { roll: { id: rollId} }),
            }
        })

        return documents.map(document => plainToInstance(DocumentDto, document))
    } 

    async getDocument(id: number): Promise<DocumentDto | null> {
        const document = await this.documentRepository.findOne({ where: { id } })

        if (!document) throw new NotFoundException()

        return plainToInstance(DocumentDto, document)
    }

    async createDocument(dto: CreateDocumentDto): Promise<DocumentDto> {
        const existingDocument = await this.documentRepository.findOne({ where: { id: dto.id }})

        if (existingDocument) { throw new ConflictException('A document with this Id already exists')}

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
