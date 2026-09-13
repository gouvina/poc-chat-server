import { TypeOrmModule } from "@nestjs/typeorm";
import { MessagesController } from "./message.controller";
import { MessageService } from "./message.service";
import { Module } from "@nestjs/common";
import { Message } from "src/entities/message.entity";
import { ConversationModule } from "../conversation/conversation.module";

@Module({
    imports: [TypeOrmModule.forFeature([Message]), ConversationModule],
    controllers: [MessagesController],
    providers: [MessageService],
})
export class MessageModule {}
