// DEPENDENCIES
// Internal dependencies
const db = require("../_db");
const Conversation = db.Conversation;

// MAIN METHODS

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
