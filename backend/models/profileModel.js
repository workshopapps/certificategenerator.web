const mongoose = require("mongoose");
const User = require("./userModel");
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

ProfileSchema.post("deleteOne", async function (next) {
  try {
    // Check if user has existing profile and delete
    await User.findOneAndDelete({ _id: this.user.toString() });

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Profile", ProfileSchema);
