/**
 * Placeholder for the external answering API (LLM / chat vendor).
 * Swap this implementation for HTTP calls later; callers should depend on `getAssistantReply` only.
 */
async function getAssistantReply({ conversationId, messages, latestUserMessage }) {
  void conversationId;
  void messages;

  await new Promise((resolve) => setTimeout(resolve, 150));

  return `Mock assistant: I received "${latestUserMessage}". (Replace conversation.reply.service with your external API.)`;
}

module.exports = {
  getAssistantReply,
};
