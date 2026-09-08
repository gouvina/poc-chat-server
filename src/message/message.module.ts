import { TypeOrmModule } from "@nestjs/typeorm";
import { MessagesController } from "./message.controller";
import { MessageService } from "./message.service";
import { Module } from "@nestjs/common";
import { Message } from "./message.entity";
import { ConversationModule } from "src//conversation/conversation.module";

@Module({
    imports: [TypeOrmModule.forFeature([Message]), ConversationModule],
    controllers: [MessagesController],
    providers: [MessageService],
})
export class MessageModule {}
