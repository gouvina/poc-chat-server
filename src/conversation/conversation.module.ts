import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from './conversation.entity';
import { ConversationController } from './conversation.controller';
import { ConversationReplyService } from './conversation.reply.service';
import { ConversationService } from './conversation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation])],
  controllers: [ConversationController],
  providers: [ConversationService, ConversationReplyService],
})
export class ConversationModule {}
