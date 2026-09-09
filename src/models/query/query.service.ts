import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { Repository } from "typeorm";
import { Query } from "src/entities/query.entity"
import { DocumentService } from "../document/document.service";
import { CreateQueryDto } from "./dto/create-query.dto";
import { QueryDto } from "./dto/query.dto";

@Injectable()
export class QueryService {
    constructor(
        @InjectRepository(Query)
        private readonly queryRepository: Repository<Query>,
        private readonly documentService: DocumentService
    ) {}

    async createQuery(dto: CreateQueryDto): Promise<QueryDto> {
        const answer = 'Boilerplate answer' // TODO: add code to generate answer
        const documents = await this.documentService.getDocuments() // TODO: add code to search documents for query
        const query = await this.queryRepository.save({
            user: dto.user,
            question: dto.question,
            answer,
            documents
        })

        return plainToInstance(QueryDto, query)
    }

    async getQueries(userId: string): Promise<QueryDto[]> {
        const queries = await this.queryRepository.find({
            where: { user: { id: userId } },
            order: { createdAt: 'ASC' }
        })

        return plainToInstance(QueryDto, queries)
    }

    async getQuery(id: string): Promise<QueryDto | null> {
        const query = await this.queryRepository.findOne({
            where: { id },
            relations: {
                documents: true
            }
        })

        if (!query) { throw new NotFoundException() }

        return plainToInstance(QueryDto, query)
    }

    async deleteQuery(id: string): Promise<QueryDto | null> {
        const existing = await this.queryRepository.findOne({
            where: { id }
        })

        if (!existing) { throw new NotFoundException }

        await this.queryRepository.remove(existing)

        return plainToInstance(QueryDto, existing)
    }
}
