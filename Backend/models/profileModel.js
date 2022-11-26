const mongoose = require("mongoose");
const { Schema } = mongoose;
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  avatar: {
    type: String,
  },
  name: {
    type: String,
    required: [true, "Must provide your name!"],
  },
  job: {
    type: String,
    required: [true, "Must provide a job!"],
  },
  location: {
    type: String,
    required: [true, "Must provide a location"],
  },
  email: {
    type: String,
    required: [true, "Must provide a valid email address!"],
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: [true, "Must provide a valid phone number!"],
  },
});

module.exports = mongoose.model("Profile", ProfileSchema);
