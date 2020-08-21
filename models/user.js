const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

var user = mongoose.model("User", {
  name: String,
  email: { type: String, unique: true },
  password: String,
});

module.exports = user;
