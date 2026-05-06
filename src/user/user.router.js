// DEPENDENCIES
// External dependencies
const express = require('express');
// Internal dependencies
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('./user.controller');

// ROUTER
const router = express.Router();

// ENDPOINTS

// GET /users - Gets list of all users in the DB
router.get('/', getUsers);

// POST /users - Creates a new user in the DB
router.post('/', createUser);

// GET /users/:id - Gets specific user from the DB by id
router.get('/:id', getUser);

// PUT /users/id - Updates specific user in the DB by id
router.put('/:id', updateUser);

// DELETE /users/id - Deletes specific user from the DB by id
router.delete('/:id', deleteUser);

module.exports = router;
