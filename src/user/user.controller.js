// DEPENDENCIES
// Internal dependencies
const userService = require('./user.service');
const { e400, e404, e500 } = require('../_constants/errors');

// MAIN METHODS

// Get list of users
exports.getUsers = async (req, res, next) => {
  try {

    // Fetch all users from DB
    const users = await userService.getUsers();
    res.json(users);

  } catch (error) {
    next({ ...e500, message: error.message || error });
  }
};

// Create new user
exports.createUser = async (req, res, next) => {
  try {

    // Validate request body
    if (
      !req.body.email || 
      !req.body.password
    ) return next(e400);

    // Create user after validation and return result
    const user = await userService.createUser(req.body);
    res.json(user);

  } catch (error) {
    next({ ...e500, message: error.message || error });
  }
};

// Get specific user based on id
exports.getUser = async (req, res, next) => {
  try {

    // Get id from params
    const id = req.params.id;

    // Validate request params
    if (!id) return next(e400);

    // Fetch user from DB and return result
    const user = await userService.getUser(id);

    // If user not found, return 404 error
    if (!user) return next(e404)

    // Otherwise, return user
    res.json(user);
  
  } catch (error) {
    next({ ...e500, message: error.message || error });
  }
};

// Update user based on id
exports.updateUser = async (req, res, next) => {
  try {

    // Get id from params
    const id = req.params.id;

    // Validate request params
    if (!id) return next(e400);

    // Validate request body
    if (
      !req.body.email || 
      !req.body.password
    ) return next(e400);

    // Update user after validation and return result
    const user = await userService.updateUser(id, req.body);

    // If user not found, return 404 error
    if (!user) return next(e404)

    // Otherwise, return updated user
    res.json(user);

  } catch (error) {
    next({ ...e500, message: error.message || error });
  }
};

// Delete user based on id
exports.deleteUser = async (req, res, next) => {
  try {

    // Get id from params
    const id = req.params.id;

    // Validate request params
    if (!id) return next(e400);

    // Delete user after validation and return result
    const user = await userService.deleteUser(id);

    // If user not found, return 404 error
    if (!user) return next(e404)

    // Otherwise, return deleted user
    res.json(user);

  } catch (error) {
    next({ ...e500, message: error.message || error });
  }
};
