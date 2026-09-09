import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Document } from "./document.entity";
import { DocumentController } from "./document.controller";
import { Roll } from "src/roll/roll.entity";
import { DocumentService } from "./document.service";

@Module({
    imports: [TypeOrmModule.forFeature([Document, Roll])],
    controllers: [DocumentController],
    providers: [DocumentService],
})
export class DocumentModule {}
