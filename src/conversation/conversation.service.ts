import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer'
import { Conversation } from './conversation.entity';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { ConversationDto } from './dto/conversation.dto';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
  ) {}

  async createConversation(dto: CreateConversationDto): Promise<ConversationDto> {
    const row = this.conversationRepository.create({
      title: dto.title,
      messages: dto.messages ?? [],
    });
    const conversation = await this.conversationRepository.save(row);

    let conversationDto = plainToInstance(ConversationDto, conversation)
  
    return conversationDto;
  }

  async getConversations(): Promise<Conversation[]> {
    return this.conversationRepository.find({ order: { createdAt: 'ASC' } });
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
