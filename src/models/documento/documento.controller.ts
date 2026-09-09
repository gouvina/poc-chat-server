import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { DocumentoService } from "./documento.service";
import { DocumentoDto } from "./dto/documento.dto";
import { CreateDocumentoDto } from "./dto/create-documento.dto";

@UseGuards(JwtAuthGuard)
@Controller('documentos')
export class DocumentoController {
    constructor(private readonly documentoService: DocumentoService) {}

    @Get()
    async getDocumentos(
        @Query('version') version?: string, 
        @Query('rolloId') rolloId?: number): Promise<DocumentoDto[]> {
        return this.documentoService.getDocumentos(version, rolloId)
    }

    @Get(':id')
    async getDocumento(@Param('id') id: number): Promise<DocumentoDto | null> {
        return this.documentoService.getDocumento(id)
    }

    @Post()
    async createDocumento(@Body() dto: CreateDocumentoDto): Promise<DocumentoDto> {
        return this.documentoService.createDocumento(dto)
    }
}