import { Module } from "@nestjs/common";
import { RollController } from "./roll.controller";
import { RollService } from "./roll.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Roll } from "./roll.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Roll])],
    controllers: [RollController],
    providers: [RollService],
})
export class RollModule {}