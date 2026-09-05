import { Module } from "@nestjs/common";
import { RolloController } from "./rollo.controller";
import { RolloService } from "./rollo.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Rollo } from "./rollo.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Rollo])],
    controllers: [RolloController],
    providers: [RolloService],
})
export class RolloModule {}