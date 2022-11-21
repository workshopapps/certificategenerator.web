const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  article: {
    type: String,
    required: true,
  },
  writtenBy: {
    type: String,
    required: true,
  },
  datePosted: {
    type: Date,
    required: true,
  },
  imageUrl: {
    type: String,
  },
});

module.exports = mongoose.model("BlogPost", blogPostSchema);
