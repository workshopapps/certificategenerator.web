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

// Retch user profile and update the profile email to match user email
ProfileSchema.post("findOne", async function (doc) {
  try {
    // User model imported this way to prevent circular dependency error
    const User = mongoose.models.User;

    // Get user for this profile
    const user = await User.findById(doc.user.toString());

    // Return if no user
    if (!user) return;

    // Return if user email and profile email are in sync
    if (user.email === doc.email) return;

    // Update user profile email
    await mongoose.models.Profile.findByIdAndUpdate(doc._id, {
      email: user.email
    });
  } catch (error) {
    console.log("Couldn't Update email, ", error.message);
  }
});

module.exports = mongoose.model("Profile", ProfileSchema);
