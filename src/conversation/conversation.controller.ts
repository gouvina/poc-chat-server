import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';

@Controller('conversations')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Get()
  async getConversations() {
    return this.conversationService.getConversations();
  }

  @Post()
  async createConversation(@Body() dto: CreateConversationDto) {
    return this.conversationService.createConversation(dto);
  }

  @Post(':id/messages')
  async sendMessage(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: SendMessageDto,
  ) {
    const text =
      typeof body.message === 'string'
        ? body.message
        : typeof body.content === 'string'
          ? body.content
          : undefined;

    if (text === undefined || !text.trim()) {
      throw new BadRequestException('message or content is required');
    }

    const result = await this.conversationService.sendMessage(id, text.trim());
    if (!result) {
      throw new NotFoundException();
    }

    return { reply: result.reply, conversation: result.conversation };
  }

  @Get(':id')
  async getConversation(@Param('id', ParseUUIDPipe) id: string) {
    const conversation = await this.conversationService.getConversation(id);
    if (!conversation) {
      throw new NotFoundException();
    }
    return conversation;
  }

  @Put(':id')
  async updateConversation(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateConversationDto,
  ) {
    const conversation = await this.conversationService.updateConversation(
      id,
      dto,
    );
    if (!conversation) {
      throw new NotFoundException();
    }
    return conversation;
  }

  @Delete(':id')
  async deleteConversation(@Param('id', ParseUUIDPipe) id: string) {
    const conversation = await this.conversationService.deleteConversation(id);
    if (!conversation) {
      throw new NotFoundException();
    }
    return conversation;
  }
}
