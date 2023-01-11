const mongoose = require("mongoose");
const User = require("./userModel");
const { Schema } = mongoose;

const ProfileSchema = new Schema({
  avatar: {
    type: String
  },
  name: {
    type: String,
  },
  job: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: Number,
    required: true
  }
});

ProfileSchema.post("deleteOne", async function (next) {
  try {
    // Check if user has existing profile and delete
    await User.findOneAndDelete({ _id: this.user });

    next();
  } catch (error) {
    next(error);
  }
});
module.exports = mongoose.model("Profile", ProfileSchema);
