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

// Delete User Account on profile delete
ProfileSchema.post("deleteOne", { document: true }, async function (doc) {
  // User model imported this way to prevent circular dependency error
  const User = mongoose.models.User;

  // Check for user account associated with this profile and delete
  await User.findOneAndDelete({ _id: doc.user.toString() });
});

module.exports = mongoose.model("Profile", ProfileSchema);
