import {
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
