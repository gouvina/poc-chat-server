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
    const conversation = await this.conversationRepository.save({
      user: dto.user,
      title: dto.title,
      messages: [
        {
          content: dto.firstMessage?.content,
          sender: dto.firstMessage?.sender
        }
      ]
    })
  
    return plainToInstance(ConversationDto, conversation);
  }
  
  async getConversations(userId: string): Promise<ConversationDto[]> {
    const conversations = await this.conversationRepository.find({ 
      where: { user: { id: userId } },
      order: { createdAt: 'ASC' } 
    });

    return plainToInstance(ConversationDto, conversations)
  }
  
  async getConversation(id: string): Promise<ConversationDto | null> {
    const conversation = await this.conversationRepository.findOne({ 
      where: { id }, 
      relations: { 
        messages: true
      } 
    });

    if (!conversation) { throw new NotFoundException() }

    return plainToInstance(ConversationDto, conversation)
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
    const conversation = await this.conversationRepository.save(existing);

    return plainToInstance(ConversationDto, conversation)
  }

  async deleteConversation(id: string): Promise<ConversationDto | null> {
    const existing = await this.conversationRepository.findOne({
      where: { id },
    });
    if (!existing) throw new NotFoundException()
    await this.conversationRepository.remove(existing);

    return plainToInstance(ConversationDto, existing)
  }
}
