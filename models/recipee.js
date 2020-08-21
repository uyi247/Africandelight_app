const mongoose = require("mongoose");

var recipe = mongoose.model("Recipe", {
  title: String,
  description: String,
  prepTime: String,
  ingredient: String,
  directions: String,
  img: { type: String, default: "" },
  user: mongoose.Schema.ObjectId,
});

module.exports = recipe;
