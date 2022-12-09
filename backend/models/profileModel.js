const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProfileSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  avatar: {
    type: String
  },
  name: {
    type: String
  },
  job: {
    type: String
  },
  location: {
    type: String
  },
  email: {
    type: String,
    required: [true, "Must provide a valid email address!"]
    //  unique: true,
  },
  phoneNumber: {
    type: String
  }
});

module.exports = mongoose.model("Profile", ProfileSchema);
