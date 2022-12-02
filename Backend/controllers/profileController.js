const Profile = require("../models/profileModel");

const addUserProfile = async (req, res, next) => {
  const payload = req.body;
  const avatar = req.files.avatar;

  if (!payload) return res.status(400).json({ error: "Bad request" });

  const userID = req.user._id;
  const user = await Profile.findOne(userID);

  let userProfile;
  if (!user) {
    userProfile = await Profile.create({
      avatar: avatar.name,
      user: userID,
      name: payload.name,
      job: payload.job,
      location: payload.location,
      email: payload.email,
      phoneNumber: payload.phoneNumber,
    });
  } else return res.status(400).json({ error: "profile already exist" });

  await userProfile.save();
  res.status(201).json({ newProfile: userProfile });
};

const getUserProfile = async (req, res) => {
  const id = req.user._id;
  const profile = await Profile.findOne({ user: id });

  if (!profile) {
    return res.status(404).json({ error: "no profile with id" });
  }

  res.status(200).json({ profile });
};

const updateUserProfile = async (req, res) => {
  const payload = { ...req.body };
  const avatar = req.files?.avatar;
  const id = req.user._id;
  const profile = await Profile.findOne({ user: id });

  if (!profile) {
    return res.status(404).json({ error: "no user profile with id" });
  }

  profile.avatar = avatar.name;
  profile.name = payload.name;
  profile.job = payload.job;
  profile.location = payload.location;
  profile.email = payload.email;
  profile.phoneNumber = payload.phoneNumber;

  await profile.save();

  res.status(201).json({ update: profile });
};
const deleteUserProfile = async (req, res) => {
  const id = req.params.id;
  const profile = await Profile.findByIdAndDelete({
    _id: id,
    user: req.user._id,
  });

  if (!profile) {
    return res.status(401).json({ error: "user profile does not exist" });
  }
  res.status(201).json({ error: "user profile deleted" });
};

module.exports = {
  addUserProfile,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
