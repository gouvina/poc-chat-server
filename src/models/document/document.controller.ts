import { Body, Controller, Get, Param, Post, Query, } from "@nestjs/common";
import { DocumentService } from "./document.service";
import { DocumentDto } from "./dto/document.dto";
import { CreateDocumentDto } from "./dto/create-document.dto";
import { FilterDocumentDto, ScoreFilter } from "./dto/filter-document.dto";

@Controller('documents')
export class DocumentController {
    constructor(private readonly documentService: DocumentService) { }

    @Get()
    async getDocuments(
        @Query() filters: FilterDocumentDto,
    ): Promise<DocumentDto[]> {
        const scoreFilters: ScoreFilter[] = []

        if (filters.scoregt !== undefined) {
            scoreFilters.push({
                value: filters.scoregt,
                relation: "gt",
            })
        }

        if (filters.scorelt !== undefined) {
            scoreFilters.push({
                value: filters.scorelt,
                relation: "lt",
            })
        }

        return this.documentService.getDocuments(scoreFilters, filters.version, filters.rollId, filters.text)
    }

    @Get(':id')
    async getDocument(@Param('id') id: number): Promise<DocumentDto | null> {
        return this.documentService.getDocument(id)
    }

    @Post()
    async createDocument(@Body() dto: CreateDocumentDto): Promise<DocumentDto> {
        return this.documentService.createDocument(dto)
    }
}
