import { TypeOrmModule } from "@nestjs/typeorm";
import { MessagesController } from "./message.controller";
import { MessageService } from "./message.service";
import { Module } from "@nestjs/common";
import { Message } from "./message.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Message])],
    controllers: [MessagesController],
    providers: [MessageService],
})
export class MessageModule {}
