const mongoose = require("mongoose");
const Profile = require("./profileModel");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true
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
    default: false
  },
  avatar: {
    type: String
  },
  subscribed: {
    type: Boolean,
    default: false
  },
  trialAvailable: {
    type: Boolean,
    default: true
  },
  subscription: {
    type: String,
    enum: ["basic", "standard", "premium"],
    default: "basic"
  },
  records: [
    {
      name: {
        type: String,
        required: [true, "Name of recipient is required"]
      },
      studentID: {
        type: String,
        required: [true, "Student ID is required"]
      },
      collectionID: {
        required: true,
        type: String
      }
    }
  ]
});

UserSchema.pre("save", async function (next) {
  try {
    // Check if new user has existing profile
    const existingProfile = await Profile.findOne({ user: this._id });

    // Don't create new profile if one already exists
    if (existingProfile) return next();

    // Create new profile if user has no profile
    await Profile.create({
      email: this.email,
      user: this._id,
    });

    next();
  } catch (error) {
    // Prevent new user from being created if profile fails to create
    next(error);
  }
});

module.exports = mongoose.model("User", UserSchema);
