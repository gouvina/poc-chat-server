import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DocumentoController } from "./documento.controller";
import { DocumentoService } from "./documento.service";
import { Documento } from "src/entities/documento.entity";
import { Rollo } from "src/entities/rollo.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Documento, Rollo])],
    controllers: [DocumentoController],
    providers: [DocumentoService],
})
export class DocumentoModule {}