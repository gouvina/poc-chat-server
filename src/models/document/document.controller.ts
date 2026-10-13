import { Body, Controller, Get, Param, Post, Query, } from "@nestjs/common";
import { DocumentService, ScoreFilter } from "./document.service";
import { DocumentDto } from "./dto/document.dto";
import { CreateDocumentDto } from "./dto/create-document.dto";

@Controller('documents')
export class DocumentController {
    constructor(private readonly documentService: DocumentService) { }

    @Get()
    async getDocuments(
        @Query('version') version?: string,
        @Query('rollId') rollId?: number,
        @Query('text') text?: string,
        @Query('scoregt') scoregt?: number,
        @Query('scorelt') scorelt?: number
    ): Promise<DocumentDto[]> {
        const scoreFilters: ScoreFilter[] = []

        if (scoregt !== undefined) {
            scoreFilters.push({
                value: scoregt,
                relation: "gt",
            })
        }

        if (scorelt !== undefined) {
            scoreFilters.push({
                value: scorelt,
                relation: "lt",
            })
        }

        return this.documentService.getDocuments(scoreFilters, version, rollId, text)
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
