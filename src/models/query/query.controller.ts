import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query, Req } from "@nestjs/common"
import { CreateQueryDto } from "./dto/create-query.dto"
import { QueryDto } from "./dto/query.dto"
import { QueryService } from "./query.service"
import { UpdateQueryDto } from "./dto/update-query.dto"
import { AuthenticatedRequest } from "src/auth/types/authenticated-request.type"

@Controller('queries')
export class QueryController {
    constructor(private readonly queryService: QueryService) { }

    @Post()
    async createQuery(@Body() dto: CreateQueryDto): Promise<QueryDto> {
        return this.queryService.createQuery(dto)
    }

    @Get()
    async getQueries(@Req() req: AuthenticatedRequest): Promise<QueryDto[]> {
        return this.queryService.getQueries(req.user.sub)
    }

    @Get(':id')
    async getQuery(
        @Param('id', ParseUUIDPipe) id: string,
        @Req() req: AuthenticatedRequest
    ): Promise<QueryDto | null> {
        return this.queryService.getQuery(id, req.user.sub)
    }

    @Patch(':id')
    async updateQuery(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateQueryDto): Promise<QueryDto | null> {
        return this.queryService.updateQuery(id, dto)
    }

    @Delete(':id')
    async deleteQuery(@Param('id', ParseUUIDPipe) id: string): Promise<QueryDto | null> {
        return this.queryService.deleteQuery(id)
    }
}
