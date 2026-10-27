import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Req } from "@nestjs/common";
import { CreateMessageDto } from "./dto/create-message.dto";
import { MessageService } from "./message.service";
import { UpdateMessageDto } from "./dto/update-message.dto";
import { MessageDto } from "./dto/message.dto";
import { AuthenticatedRequest } from "src/auth/types/authenticated-request.type";

@Controller('conversations/:conversationId/messages')
export class MessagesController {
    constructor(private readonly messageService: MessageService) { }

    @Post()
    async createMessage(
        @Param('conversationId', ParseUUIDPipe) conversationId: string,
        @Req() req: AuthenticatedRequest,
        @Body() dto: CreateMessageDto
    ): Promise<MessageDto> {
        return this.messageService.createMessage(conversationId, req.user.sub, dto)
    }

    @Get()
    async getMessages(
        @Param('conversationId', ParseUUIDPipe) conversationId: string,
        @Req() req: AuthenticatedRequest
    ): Promise<MessageDto[]> {
        return this.messageService.getMessages(conversationId, req.user.sub)
    }

    @Get(':id')
    async getMessage(
        @Param('id', ParseUUIDPipe) id: string,
        @Param('conversationId', ParseUUIDPipe) conversationId: string,
        @Req() req: AuthenticatedRequest
    ): Promise<MessageDto | null> {
        return this.messageService.getMessage(id, conversationId, req.user.sub)
    }

    @Patch(':id')
    async updateMessage(
        @Param('id', ParseUUIDPipe) id: string,
        @Param('conversationId', ParseUUIDPipe) conversationId: string,
        @Req() req: AuthenticatedRequest,
        @Body() dto: UpdateMessageDto,
    ): Promise<MessageDto | null> {
        return this.messageService.updateMessage(id, conversationId, req.user.sub, dto)
    }

    @Delete(':id')
    async deleteMessage(
        @Param('id', ParseUUIDPipe) id: string,
        @Param('conversationId', ParseUUIDPipe) conversationId: string,
        @Req() req: AuthenticatedRequest
    ): Promise<MessageDto | null> {
        return this.messageService.deleteMessage(id, conversationId, req.user.sub)
    }
}
