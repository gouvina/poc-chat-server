// Global environment variables
require('dotenv').config();

// Third-party dependencies
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// Create database config
const db = {};
db.mongoose = mongoose;
db.url = process.env.DATABASE_URL;
db.User = require("../user/user.model")(mongoose);
// Add more models here...

module.exports = db;
