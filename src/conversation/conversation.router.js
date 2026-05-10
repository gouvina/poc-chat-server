// DEPENDENCIES
// External dependencies
const express = require("express");
// Internal dependencies
const {
  getConversations,
  getConversation,
  createConversation,
  updateConversation,
  deleteConversation,
} = require("./conversation.controller");

// ROUTER
const router = express.Router();

// ENDPOINTS

// GET /conversations - Gets list of all conversations in the DB
router.get("/", getConversations);

// POST /conversations - Creates a new conversation in the DB
router.post("/", createConversation);

// GET /conversations/:id - Gets specific conversation from the DB by id
router.get("/:id", getConversation);

// PUT /conversations/:id - Updates specific conversation in the DB by id
router.put("/:id", updateConversation);

// DELETE /conversations/:id - Deletes specific conversation from the DB by id
router.delete("/:id", deleteConversation);

module.exports = router;
