import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from './conversation.entity';
import { ConversationReplyService } from './conversation.reply.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
    private readonly conversationReplyService: ConversationReplyService,
  ) {}

  async sendMessage(
    id: string,
    text: string,
  ): Promise<{ reply: string; conversation: Conversation } | null> {
    const conversation = await this.conversationRepository.findOne({
      where: { id },
    });
    if (!conversation) return null;

    const messagesAfterUser = [...conversation.messages, text];

    const reply = await this.conversationReplyService.getAssistantReply({
      conversationId: conversation.id,
      messages: messagesAfterUser,
      latestUserMessage: text,
    });

    conversation.messages = [...messagesAfterUser, reply];
    await this.conversationRepository.save(conversation);

    return { reply, conversation };
  }

  async getConversations(): Promise<Conversation[]> {
    return this.conversationRepository.find({ order: { createdAt: 'ASC' } });
  }

  async createConversation(dto: CreateConversationDto): Promise<Conversation> {
    const row = this.conversationRepository.create({
      clientId: dto.id,
      title: dto.title,
      messages: dto.messages ?? [],
    });
    return this.conversationRepository.save(row);
  }

  async getConversation(id: string): Promise<Conversation | null> {
    return this.conversationRepository.findOne({ where: { id } });
  }

  async updateConversation(
    id: string,
    dto: UpdateConversationDto,
  ): Promise<Conversation | null> {
    const existing = await this.conversationRepository.findOne({
      where: { id },
    });
    if (!existing) return null;
    existing.clientId = dto.id;
    existing.title = dto.title;
    existing.messages = dto.messages ?? [];
    return this.conversationRepository.save(existing);
  }

  async deleteConversation(id: string): Promise<Conversation | null> {
    const existing = await this.conversationRepository.findOne({
      where: { id },
    });
    if (!existing) return null;
    await this.conversationRepository.remove(existing);
    return existing;
  }
}
