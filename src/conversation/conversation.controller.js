// DEPENDENCIES
// Internal dependencies
const conversationService = require("./conversation.service");
const { e400, e404, e500 } = require("../_constants/errors");

// MAIN METHODS

// Get list of conversations
exports.getConversations = async (req, res, next) => {
  try {
    // Fetch all conversations from DB
    const conversations = await conversationService.getConversations();
    res.json(conversations);
  } catch (error) {
    next({ ...e500, message: error.message || error });
  }
};

// Create new conversation
exports.createConversation = async (req, res, next) => {
  try {
    // Validate request body
    if (!req.body.id || !req.body.title || !Array.isArray(req.body.messages)) return next(e400);

    // Create conversation after validation and return result
    const conversation = await conversationService.createConversation(req.body);
    res.json(conversation);
  } catch (error) {
    next({ ...e500, message: error.message || error });
  }
};

// Get specific conversation based on id
exports.getConversation = async (req, res, next) => {
  try {
    // Get id from params
    const id = req.params.id;

    // Validate request params
    if (!id) return next(e400);

    // Fetch conversation from DB and return result
    const conversation = await conversationService.getConversation(id);

    // If conversation not found, return 404 error
    if (!conversation) return next(e404);

    // Otherwise, return conversation
    res.json(conversation);
  } catch (error) {
    next({ ...e500, message: error.message || error });
  }
};

// Update conversation based on id
exports.updateConversation = async (req, res, next) => {
  try {
    // Get id from params
    const id = req.params.id;

    // Validate request params
    if (!id) return next(e400);

    // Validate request body
    if (!req.body.id || !req.body.title || !Array.isArray(req.body.messages)) return next(e400);

    // Update conversation after validation and return result
    const conversation = await conversationService.updateConversation(id, req.body);

    // If conversation not found, return 404 error
    if (!conversation) return next(e404);

    // Otherwise, return updated conversation
    res.json(conversation);
  } catch (error) {
    next({ ...e500, message: error.message || error });
  }
};

// Delete conversation based on id
exports.deleteConversation = async (req, res, next) => {
  try {
    // Get id from params
    const id = req.params.id;

    // Validate request params
    if (!id) return next(e400);

    // Delete conversation after validation and return result
    const conversation = await conversationService.deleteConversation(id);

    // If conversation not found, return 404 error
    if (!conversation) return next(e404);

    // Otherwise, return deleted conversation
    res.json(conversation);
  } catch (error) {
    next({ ...e500, message: error.message || error });
  }
};
