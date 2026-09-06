import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Message } from "./message.entity";
import { Repository } from "typeorm";
import { CreateMessageDto } from "./dto/create-message.dto";
import { MessageDto } from "./dto/message.dto";
import { plainToInstance } from "class-transformer";
import { UpdateMessageDto } from "./dto/update-message.dto";
import { ConversationService } from "src/conversation/conversation.service";

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
        private readonly conversationService: ConversationService,
    ) {}

    async createMessage(conversationId: string, dto: CreateMessageDto): Promise<MessageDto> {
        const conversation = await this.conversationService.getConversation(conversationId)

        if (!conversation) throw new NotFoundException()

        const message = this.messageRepository.save({
            conversation: conversation,
            content: dto.content,
            sender: dto.sender,
        })

        return plainToInstance(MessageDto, message)
    }

    async getMessages(conversationId: string): Promise<MessageDto[]> {
        const conversation = await this.conversationService.getConversation(conversationId)
        
        if (!conversation) throw new NotFoundException()

        return plainToInstance(MessageDto, conversation.messages)
    }

    async getMessage(id: string, conversationId: string): Promise<MessageDto | null> {
        const conversation = await this.conversationService.getConversation(conversationId)

        if (!conversation) throw new NotFoundException()


        const message = conversation.messages.find(message => message.id === id)

        if (!message) throw new NotFoundException()

        return plainToInstance(MessageDto, message)
    }

    async updateMessage(
        id: string,
        conversationId: string,
        dto: UpdateMessageDto,
    ): Promise<MessageDto | null> {

        const conversation = await this.conversationService.getConversation(conversationId)

        if (!conversation) throw new NotFoundException()

        const existing = conversation.messages.find(message => message.id === id)

        if (!existing) throw new NotFoundException()

        existing.content = dto.content ?? existing.content
        existing.sender = dto.sender ?? existing.sender
        const message = await this.messageRepository.save(existing)

        conversation.messages.splice(conversation.messages.indexOf(existing), 1, message)
        conversation.messages.push(message)

        return plainToInstance(MessageDto, message)
    }

    async deleteMessage(id: string, conversationId: string): Promise<MessageDto | null> {
        const conversation = await this.conversationService.getConversation(conversationId)

        if (!conversation) throw new NotFoundException()

        const existing = await this.messageRepository.findOne({where: { id }})

        if (!existing || !conversation.messages.find(message => message.id === id)) throw new NotFoundException()

        conversation.messages.splice(conversation.messages.indexOf(existing), 1)
     
        await this.messageRepository.remove(existing)

        return plainToInstance(MessageDto, existing)
    }
}
