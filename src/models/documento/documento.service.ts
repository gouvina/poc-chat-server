import { Injectable, NotFoundException, Query } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { DocumentoDto } from "./dto/documento.dto";
import { CreateDocumentoDto } from "./dto/create-documento.dto"
import { plainToInstance } from "class-transformer";
import { Documento } from "src/entities/documento.entity";

@Injectable()
export class DocumentoService {
    constructor(
        private readonly dataSource: DataSource,
        @InjectRepository(Documento)
        private readonly documentoRepository: Repository<Documento>
    ) {}

    async getDocumentos(
        version?: string, 
        rolloId?: number
    ): Promise<DocumentoDto[]> {
        const documentos = await this.documentoRepository.find({
            where: {
                ...(version !== undefined && { version }),
                ...(rolloId !== undefined && { rolloId }),
            }
        })

        return documentos.map(documento => plainToInstance(DocumentoDto, documento))
    } 

    async getDocumento(id: number): Promise<DocumentoDto | null> {
        const documento = await this.documentoRepository.findOne({ where: { id } })

        if (!documento) throw new NotFoundException()

        return plainToInstance(DocumentoDto, documento)
    }

    async createDocumento(dto: CreateDocumentoDto): Promise<DocumentoDto> {
        const documento = await this.dataSource.transaction(async manager => {
            const documento = await manager.create(Documento, {
                id: dto.id,
                hoja: dto.hoja,
                calificacion: dto.calificacion,
                version: dto.version,
                texto: dto.texto,
                rollo: dto.rollo,
            })

            await manager.save(documento)

            return documento
        })

        return plainToInstance(DocumentoDto, documento)
    }
}