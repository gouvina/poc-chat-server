import { Body, Controller, Delete, Get, NotFoundException, Param, ParseUUIDPipe, Patch, Post } from "@nestjs/common";
import { CreateMessageDto } from "./dto/create-message.dto";
import { MessageService } from "./message.service";
import { UpdateMessageDto } from "./dto/update-message.dto";
import { MessageDto } from "./dto/message.dto";

@Controller('conversations/:conversationId/messages')
export class MessagesController {
    constructor(private readonly messageService: MessageService) {}

    @Post()
    async createMessage(@Param('conversationId', ParseUUIDPipe) conversationId: string, @Body() dto: CreateMessageDto): Promise<MessageDto> {
        return this.messageService.createMessage(conversationId, dto)
    }

    @Get()
    async getMessages(): Promise<MessageDto[]> {
        return this.messageService.getMessages()
    }

    @Get(':id')
    async getMessage(@Param('id', ParseUUIDPipe) id: string): Promise<MessageDto | null> {
        return this.messageService.getMessage(id)
    }

    @Patch(':id')
    async updateMessage(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: UpdateMessageDto,
    ): Promise<MessageDto | null> {
        return this.messageService.updateMessage(id, dto)
    }

    @Delete(':id')
    async deleteMessage(@Param('id', ParseUUIDPipe) id: string): Promise<MessageDto | null> {
        return this.messageService.deleteMessage(id)
    }
}
