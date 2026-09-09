import { Body, Controller, Get, Param, Post, Query, } from "@nestjs/common";
import { DocumentService } from "./document.service";
import { DocumentDto } from "./dto/document.dto";
import { CreateDocumentDto } from "./dto/create-document.dto";

@Controller('documents')
export class DocumentController {
    constructor(private readonly documentService: DocumentService) {}

    @Get()
    async getDocuments(
        @Query('version') version?: string, 
        @Query('rollId') rollId?: number): Promise<DocumentDto[]> {
        return this.documentService.getDocuments(version, rollId)
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