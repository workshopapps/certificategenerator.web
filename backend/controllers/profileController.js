require("dotenv").config();
const Profile = require("../models/profileModel");
const cloudinary = require("cloudinary").v2;
const {
  handleAsync,
  handleResponse,
  createApiError
} = require("../utils/helpers");
const Joi = require("joi");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const addUserProfile = handleAsync(async (req, res) => {
  const userID = req.user._id;

  // Define validatio schema
  const schema = Joi.object({
    avatar: Joi.string(),
    name: Joi.string().required(),
    job: Joi.string().required(),
    location: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().required()
  });

  // Validate payload against schema
  const { error } = schema.validate(req.body);

  // Validation error occured
  if (error) throw createApiError(error.message, 400);

  // Check if user already has a profile
  const user = await Profile.findOne({ user: userID });

  if (user) throw createApiError("profile already exist", 400);

  // Create new profile
  const profile = await Profile.create({ ...req.body, user: userID });

  await profile.save();

  res.status(201).json(handleResponse({ profile }));
});

const getUserProfile = handleAsync(async (req, res) => {
  const id = req.user._id;

  // Get user's profile from db
  const profile = await Profile.findOne({ user: id });

  if (!profile) throw createApiError("No profile for this user", 404);

  res.status(200).json(handleResponse({ profile }));
});

const updateUserProfile = handleAsync(async (req, res) => {
  const id = req.user._id;

  const schema = Joi.object({
    avatar: Joi.string(),
    name: Joi.string(),
    job: Joi.string(),
    location: Joi.string(),
    email: Joi.string().email(),
    phoneNumber: Joi.string()
  });

  // Validate payload against schema
  const { error } = schema.validate(req.body);

  // Validation failed
  if (error) throw createApiError(error.message, 400);

  const profile = await Profile.findOneAndUpdate({ user: id }, req.body, {
    new: true
  });

  if (!profile) throw createApiError("User has no profile", 404);

  res.status(201).json(handleResponse({ profile }));
});

const deleteUserProfile = handleAsync(async (req, res) => {
  const profile = await Profile.findOne({
    user: req.user._id
  });

  if (!profile) throw createApiError("user profile does not exist", 401);

  await profile.deleteOne();

  res.status(201).json(handleResponse({ profile }));
});

const uploadUserAvatar = handleAsync(async (req, res) => {
  const avatar = req.files.avatar;
  const { width = 400, height = 400 } = req.query; // certogo.hng.tech/api/profile?width=20&height=20
  const user = req.user;

  // Verify that avatar was sent
  if (!avatar) throw createApiError("avatar is required", 400);

  // Upload avatar to cloudinary
  const result = await cloudinary.uploader.upload(avatar.tempFilePath, {
    // Crop image to focus on faces, resize image to have width and height
    eager: [{ width, height, gravity: "faces", crop: "thumb" }]
  });

  // Add avatar image url to user profile
  const profile = await Profile.findOneAndUpdate(
    { user: user._id },
    { avatar: result.eager[0].secure_url },
    { new: true }
  );

  if (!profile) throw createApiError("User has no profile", 404);

  res.status(200).json(handleResponse({ avatar: profile.avatar }));
});

module.exports = {
  addUserProfile,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  uploadUserAvatar
};
