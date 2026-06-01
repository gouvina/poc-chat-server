import { Injectable, NotFoundException } from "@nestjs/common";
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

    async getMessages(): Promise<MessageDto[]> {
        const messages = await this.messageRepository.find({ order: { createdAt: 'ASC' } })

        const messagesDto = messages.map(message => plainToInstance(MessageDto, message))

        return messagesDto
    }

    async getMessage(id: string): Promise<MessageDto | null> {
        const message = await this.messageRepository.findOne({ where: { id } })

        if (!message) throw new NotFoundException()

        const messageDto = plainToInstance(MessageDto, message)

        return messageDto
    }

    async updateMessage(
        id: string,
        dto: UpdateMessageDto,
    ): Promise<MessageDto | null> {
        const existing = await this.messageRepository.findOne({ where: { id } })

        if (!existing) throw new NotFoundException()

        existing.content = dto.content
        const message = await this.messageRepository.save(existing)

        const messageDto = plainToInstance(MessageDto, message)
        return messageDto
    }

    async deleteMessage(id: string): Promise<MessageDto | null> {
        const existing = await this.messageRepository.findOne({ where: { id } })

        if (!existing) throw new NotFoundException()

        await this.messageRepository.remove(existing)
        
        const messageDto = plainToInstance(MessageDto, existing)
        return messageDto
    }
}
