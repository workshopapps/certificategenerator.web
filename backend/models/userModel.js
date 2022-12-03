const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  authenticationType: {
    form: {
      password: String
    },
    google: {
      uuid: String
    }
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
  },
  subscribed: {
    type: Boolean,
    default: false,
  },
  trialAvailable: {
    type: Boolean,
    default: true,
  },
  subscription: {
    type: String,
    enum: ["basic", "standard", "premium"],
    default: "basic",
  },
  records: [
    {
      name: {
        type: String,
        required: [true, "Name of recipient is required"],
      },
      studentID: {
        type: String,
        required: [true, "Student ID is required"],
      },
      collectionID: {
        required: true,
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
