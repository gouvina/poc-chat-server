import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Documento } from "./documento.entity";
import { Rollo } from "src/rollo/rollo.entity";
import { DocumentoController } from "./documento.controller";
import { DocumentoService } from "./documento.service";

@Module({
    imports: [TypeOrmModule.forFeature([Documento, Rollo])],
    controllers: [DocumentoController],
    providers: [DocumentoService],
})
export class DocumentoModule {}