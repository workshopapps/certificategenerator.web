const mongoose = require("mongoose");
const { Schema } = require('mongoose');

const TemplateSchema = new mongoose.Schema({
  publicId: {
    type: String,
    required: true
  },
  secureUrl: {
    type: String,
    required: true
  },
  userId:{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  });

module.exports = mongoose.model("Template", TemplateSchema);
