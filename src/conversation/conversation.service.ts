import { Injectable, NotFoundException } from '@nestjs/common';
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
      user: dto.user,
      title: dto.title,
      messages: dto.firstMessage ? [{content: dto.firstMessage.content, sender: dto.firstMessage.sender}] : [],
    });
    
    const conversation = await this.conversationRepository.save(row);
    
    const conversationDto = plainToInstance(ConversationDto, conversation)
    
    return conversationDto;
  }
  
  async getConversations(): Promise<ConversationDto[]> {
    const conversations = await this.conversationRepository.find({ order: { createdAt: 'ASC' } });

    const conversationsDto = conversations.map(conversation => plainToInstance(ConversationDto, conversation))
  
    return conversationsDto;
  }
  
  async getConversation(id: string): Promise<ConversationDto | null> {
    const conversation = await this.conversationRepository.findOne({ where: { id } });

    if (!conversation) throw new NotFoundException()

    const conversationDto = plainToInstance(ConversationDto, conversation)
  
    return conversationDto;
  }

  async updateConversation(
    id: string,
    dto: UpdateConversationDto,
  ): Promise<ConversationDto | null> {
    const existing = await this.conversationRepository.findOne({
      where: { id },
    });
    if (!existing) throw new NotFoundException()
    existing.title = dto.title ?? existing.title;
    existing.messages = dto.messages ?? existing.messages;
    const conversation = await this.conversationRepository.save(existing);

    const conversationDto = plainToInstance(ConversationDto, conversation)
  
    return conversationDto;
  }

  async deleteConversation(id: string): Promise<ConversationDto | null> {
    const existing = await this.conversationRepository.findOne({
      where: { id },
    });
    if (!existing) throw new NotFoundException()
    await this.conversationRepository.remove(existing);

    const conversationDto = plainToInstance(ConversationDto, existing)
  
    return conversationDto;
  }
}
