import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Message } from "./message.entity";
import { Repository } from "typeorm";
import { CreateMessageDto } from "./dto/create-message.dto";
import { MessageDto } from "./dto/message.dto";
import { plainToInstance } from "class-transformer";
import { UpdateMessageDto } from "./dto/update-message.dto";
import { Conversation } from "src/conversation/conversation.entity";

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
        @InjectRepository(Conversation)
        private readonly conversationRepository: Repository<Conversation>,
    ) {}

    async createMessage(conversationId: string, dto: CreateMessageDto): Promise<MessageDto> {
        let conversation = await this.conversationRepository.findOne({ where: { id: conversationId } })

        if (!conversation) throw new NotFoundException()

        const row = this.messageRepository.create({
            conversation: conversation,
            content: dto.content,
            sender: dto.sender,
        })

        const message = await this.messageRepository.save(row)

        let messageDto = plainToInstance(MessageDto, message)

        return messageDto
    }

    async getMessages(conversationId: string): Promise<MessageDto[]> {
        const conversation = await this.conversationRepository.findOne({ where: { id: conversationId }, relations: ['messages'] })

        if (!conversation) throw new NotFoundException()

        const messagesDto = conversation.messages.map(message => plainToInstance(MessageDto, message))

        return messagesDto
    }

    async getMessage(id: string, conversationId: string): Promise<MessageDto | null> {
        const conversation = await this.conversationRepository.findOne({ where: { id: conversationId }, relations: ['messages'] })

        if (!conversation) throw new NotFoundException()


        const message = conversation.messages.find(message => message.id === id)

        if (!message) throw new NotFoundException()

        const messageDto = plainToInstance(MessageDto, message)

        return messageDto
    }

    async updateMessage(
        id: string,
        conversationId: string,
        dto: UpdateMessageDto,
    ): Promise<MessageDto | null> {

        const conversation = await this.conversationRepository.findOne({ where: { id: conversationId }, relations: ['messages'] })

        if (!conversation) throw new NotFoundException()

        const existing = conversation.messages.find(message => message.id === id)

        if (!existing) throw new NotFoundException()

        existing.content = dto.content ?? existing.content
        existing.sender = dto.sender ?? existing.sender
        const message = await this.messageRepository.save(existing)

        conversation.messages.splice(conversation.messages.indexOf(existing), 1, message)
        conversation.messages.push(message)

        await this.conversationRepository.save(conversation)

        const messageDto = plainToInstance(MessageDto, message)
        return messageDto
    }

    async deleteMessage(id: string, conversationId: string): Promise<MessageDto | null> {
        const conversation = await this.conversationRepository.findOne({ where: { id: conversationId }, relations: ['messages'] })

        if (!conversation) throw new NotFoundException()

        const existing = conversation.messages.find(message => message.id === id)

        if (!existing) throw new NotFoundException()

        conversation.messages.splice(conversation.messages.indexOf(existing), 1)
        
        await this.conversationRepository.save(conversation)
        await this.messageRepository.remove(existing)

        const messageDto = plainToInstance(MessageDto, existing)
        return messageDto
    }
}
