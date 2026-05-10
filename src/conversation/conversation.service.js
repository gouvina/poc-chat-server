// DEPENDENCIES
// Internal dependencies
const db = require("../_db");
const { getAssistantReply } = require("./conversation.reply.service");

const Conversation = db.Conversation;

// MAIN METHODS

// Receive a user message, persist both sides, return assistant reply
exports.sendMessage = async (_id, text) => {
  const conversation = await Conversation.findById(_id);
  if (!conversation) return null;

  conversation.messages.push(text);

  const reply = await getAssistantReply({
    conversationId: conversation._id.toString(),
    messages: conversation.messages,
    latestUserMessage: text,
  });

  conversation.messages.push(reply);
  await conversation.save();

  return { reply, conversation };
};

// Get list of conversations
exports.getConversations = async () => {
  return await Conversation.find();
};

// Create new conversation
exports.createConversation = async (body) => {
  const conversation = new Conversation({
    id: body.id,
    title: body.title,
    messages: body.messages || [],
  });
  return await conversation.save(conversation);
};

// Get specific conversation based on id
exports.getConversation = async (_id) => {
  return await Conversation.findById(_id);
};

// Update conversation based on id
exports.updateConversation = async (_id, body) => {
  return await Conversation.findOneAndUpdate({ _id }, body, { new: true });
};

// Delete conversation based on id
exports.deleteConversation = async (_id) => {
  return await Conversation.findOneAndDelete({ _id });
};
