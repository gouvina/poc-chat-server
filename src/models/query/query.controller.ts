import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query } from "@nestjs/common"
import { CreateQueryDto } from "./dto/create-query.dto"
import { QueryDto } from "./dto/query.dto"
import { QueryService } from "./query.service"

@Controller('queries')
export class QueryController {
    constructor(private readonly queryService: QueryService) {}

    @Post()
    async createQuery(@Body() dto: CreateQueryDto): Promise<QueryDto> {
        return this.queryService.createQuery(dto)
    }

    @Get()
    async getQueries(@Query('userId', ParseUUIDPipe) userId: string): Promise<QueryDto[]> {
        return this.queryService.getQueries(userId)
    }

    @Get(':id')
    async getQuery(@Param('id', ParseUUIDPipe) id: string): Promise<QueryDto | null> {
        return this.queryService.getQuery(id)
    }

    @Delete(':id')
    async deleteConversation(@Param('id', ParseUUIDPipe) id: string): Promise<QueryDto | null> {
        return this.queryService.deleteQuery(id)
    }
}
