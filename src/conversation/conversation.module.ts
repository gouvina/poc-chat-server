import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from './conversation.entity';
import { ConversationController } from './conversation.controller';
import { ConversationService } from './conversation.service';
import { Message } from 'src/message/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation, Message])],
  controllers: [ConversationController],
  providers: [ConversationService],
})
export class ConversationModule {}
