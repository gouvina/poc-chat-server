import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Message } from "./message.entity";
import { Repository } from "typeorm";
import { CreateMessageDto } from "./dto/create-message.dto";
import { MessageDto } from "./dto/message.dto";
import { plainToInstance } from "class-transformer";
import { UpdateMessageDto } from "./dto/update-message.dto";

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
    ) {}

    async createMessage(conversationId: string, dto: CreateMessageDto): Promise<MessageDto> {
        const row = this.messageRepository.create({
            conversationId,
            content: dto.content,
            sender: dto.sender,
        })

        const message = await this.messageRepository.save(row)

        let messageDto = plainToInstance(MessageDto, message)

        return messageDto
    }

    async getMessages(): Promise<Message[]> {
        return this.messageRepository.find({ order: { createdAt: 'ASC' } })
    }

    async getMessage(id: string): Promise<Message | null> {
        return this.messageRepository.findOne({ where: { id } })
    }

    async updateMessage(
        id: string,
        dto: UpdateMessageDto,
    ): Promise<Message | null> {
        const existing = await this.messageRepository.findOne({ where: { id } })

        if (!existing) return null

        existing.content = dto.content
        return this.messageRepository.save(existing)
    }

    async deleteMessage(id: string): Promise<Message | null> {
        const existing = await this.messageRepository.findOne({ where: { id } })

        if (!existing) return null

        await this.messageRepository.remove(existing)
        
        return existing
    }
}