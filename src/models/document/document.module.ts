import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Document } from "./document.entity";
import { DocumentController } from "./document.controller";
import { DocumentService } from "./document.service";
import { Roll } from "src/entities/roll.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Document, Roll])],
    exports: [DocumentService],
    controllers: [DocumentController],
    providers: [DocumentService],
})
export class DocumentModule {}
