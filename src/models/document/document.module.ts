import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Document } from "./document.entity";
import { DocumentController } from "./document.controller";
import { DocumentService } from "./document.service";
import { Roll } from "../roll/roll.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Document, Roll])],
    controllers: [DocumentController],
    providers: [DocumentService],
})
export class DocumentModule {}