import { Body, Controller, Delete, Get, NotFoundException, Param, ParseUUIDPipe, Patch, Post } from "@nestjs/common";
import { CreateMessageDto } from "./dto/create-message.dto";
import { MessageService } from "./message.service";
import { UpdateMessageDto } from "./dto/update-message.dto";

@Controller('conversations/:conversationId/messages')
export class MessagesController {
    constructor(private readonly messageService: MessageService) {}

    @Post()
    async createMessage(@Param('conversationId', ParseUUIDPipe) conversationId: string, @Body() dto: CreateMessageDto) {
        return this.messageService.createMessage(conversationId, dto)
    }

    @Get()
    async getMessages() {
        return this.messageService.getMessages()
    }

    @Get(':id')
    async getMessage(@Param('id', ParseUUIDPipe) id: string) {
        const message = await this.messageService.getMessage(id)
        if (!message) {
            throw new NotFoundException()
        }

        return message
    }

    @Patch(':id')
    async updateMessage(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: UpdateMessageDto,
    ) {
        const message = await this.messageService.updateMessage(id, dto)

        if (!message) {
            throw new NotFoundException()
        }

        return message
    }

    @Delete(':id')
    async deleteMessage(@Param('id', ParseUUIDPipe) id: string) {
        const message = await this.messageService.deleteMessage(id)

        if (!message) {
            throw new NotFoundException()
        }

        return message
    }
}