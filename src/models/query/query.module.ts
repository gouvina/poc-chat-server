import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Query } from "src/entities/query.entity";
import { QueryService } from "./query.service";
import { QueryController } from "./query.controller";
import { DocumentModule } from "../document/document.module";

@Module({
    imports: [TypeOrmModule.forFeature([Query]), DocumentModule],
    controllers: [QueryController],
    providers: [QueryService],
})
export class QueryModule {}