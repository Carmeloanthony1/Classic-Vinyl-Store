const mongoose = require("mongoose");

const user_schema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    refresh_token: String
});

module.exports = mongoose.model('User', user_schema, "users");