import { TypeOrmModule } from "@nestjs/typeorm";
import { MessagesController } from "./message.controller";
import { MessageService } from "./message.service";
import { Module } from "@nestjs/common";
import { Message } from "./message.entity";
import { Conversation } from "src/conversation/conversation.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Message]), TypeOrmModule.forFeature([Conversation])],
    controllers: [MessagesController],
    providers: [MessageService],
})
export class MessageModule {}
