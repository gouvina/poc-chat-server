import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationController } from './conversation.controller';
import { ConversationService } from './conversation.service';
import { Conversation } from 'src/entities/conversation.entity';
import { Message } from 'src/entities/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation, Message])],
  exports: [ConversationService],
  controllers: [ConversationController],
  providers: [ConversationService],
})
export class ConversationModule {}
