import { RolloService } from "./rollo.service";
import { Body, Controller, Get, Param, Post, } from "@nestjs/common";
import { RolloDto } from "./dto/rollo.dto";
import { CreateRolloDto } from "./dto/create-rollo.dto";

@Controller('rollos')
export class RolloController {
    constructor(private readonly rolloService: RolloService) {}

    @Get()
    async getRollos(): Promise<RolloDto[]> {
        return this.rolloService.getRollos()
    }

    @Get(':id')
    async getRollo(@Param('id') id: number): Promise<RolloDto | null> {
        return this.rolloService.getRollo(id)
    }

    @Post()
    async createRollo(@Body() createRolloDto: CreateRolloDto): Promise<RolloDto> {
        return this.rolloService.createRollo(createRolloDto)
    }
}