import { RollService } from "./roll.service";
import { Body, Controller, Get, Param, Post, } from "@nestjs/common";
import { RollDto } from "./dto/roll.dto";
import { CreateRollDto } from "./dto/create-roll.dto";

@Controller('rolls')
export class RollController {
    constructor(private readonly rollService: RollService) {}

    @Get()
    async getRolls(): Promise<RollDto[]> {
        return this.rollService.getRolls()
    }

    @Get(':id')
    async getRoll(@Param('id') id: number): Promise<RollDto | null> {
        return this.rollService.getRoll(id)
    }

    @Post()
    async createRoll(@Body() createRollDto: CreateRollDto): Promise<RollDto> {
        return this.rollService.createRoll(createRollDto)
    }
}
