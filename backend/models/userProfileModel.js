const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProfileSchema = new Schema({
  avatar: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  job: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Profile", ProfileSchema);
