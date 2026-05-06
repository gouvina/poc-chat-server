// DEPENDENCIES
// Internal dependencies
const db = require("../_db");
const User = db.User;

// MAIN METHODS

// Get list of users
exports.getUsers = async () => {
  return await User.find();
};

// Create new user
exports.createUser = async (body) => {
  const user = new User({
    email: body.email,
    password: body.password,
  });
  return await user.save(user);
};

// Get specific user based on id
exports.getUser = async (_id) => {
  return await User.findById(_id);
};

// Update user based on id
exports.updateUser = async (_id, body) => {
  return await User.findOneAndUpdate({ _id }, body, { new: true});
};

// Delete user based on id
exports.deleteUser = async (_id) => {
  return await User.findOneAndDelete({ _id });
};
