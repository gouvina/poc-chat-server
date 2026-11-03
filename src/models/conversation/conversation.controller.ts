import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req
} from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { ConversationDto } from './dto/conversation.dto';
import { AuthenticatedRequest } from 'src/auth/types/authenticated-request.type';

@Controller('conversations')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) { }

  @Post()
  async createConversation(@Body() dto: CreateConversationDto): Promise<ConversationDto> {
    return this.conversationService.createConversation(dto);
  }

  @Get()
  async getConversations(@Req() req: AuthenticatedRequest): Promise<ConversationDto[]> {
    return this.conversationService.getConversations(req.user.sub);
  }

  @Get(':id')
  async getConversation(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: AuthenticatedRequest
  ): Promise<ConversationDto | null> {
    return this.conversationService.getConversation(id, req.user.sub);
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
