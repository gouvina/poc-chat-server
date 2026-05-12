import { Injectable } from '@nestjs/common';

/**
 * Placeholder for the external answering API (LLM / chat vendor).
 * Swap this implementation for HTTP calls later; callers should depend on `getAssistantReply` only.
 */
@Injectable()
export class ConversationReplyService {
  async getAssistantReply(params: {
    conversationId: string;
    messages: string[];
    latestUserMessage: string;
  }): Promise<string> {
    void params.conversationId;
    void params.messages;

    await new Promise((resolve) => setTimeout(resolve, 150));

    return `Mock assistant: I received "${params.latestUserMessage}". (Replace conversation.reply.service with your external API.)`;
  }
}
