import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post
} from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { ConversationDto } from './dto/conversation.dto';

@Controller('conversations')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post()
  async createConversation(@Body() dto: CreateConversationDto): Promise<ConversationDto> {
    return this.conversationService.createConversation(dto);
  }

  @Get('user/:userId')
  async getConversations(@Param('userId', ParseUUIDPipe) userId: string): Promise<ConversationDto[]> {
    return this.conversationService.getConversations(userId);
  }

  @Get(':id')
  async getConversation(@Param('id', ParseUUIDPipe) id: string): Promise<ConversationDto | null> {
    console.log('Entre a conversation controller')
    return this.conversationService.getConversation(id);
  }

  @Patch(':id')
  async updateConversation(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateConversationDto,
  ): Promise<ConversationDto | null> {
    return this.conversationService.updateConversation(
      id,
      dto,
    );
  }

  @Delete(':id')
  async deleteConversation(@Param('id', ParseUUIDPipe) id: string): Promise<ConversationDto | null> {
   return this.conversationService.deleteConversation(id);
  }
}
