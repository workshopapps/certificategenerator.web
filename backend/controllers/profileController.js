const Profile = require("../models/profileModel");
const {
  handleAsync,
  handleResponse,
  createApiError
} = require("../utils/helpers");
const Joi = require("joi");

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
    phoneNumber: Joi.string()
  });

  // Validate payload against schema
  const { error } = schema.validate(req.body);

  // Validation failed
  if (error) throw createApiError(error.message, 400);

  const profile = await Profile.findOneAndUpdate({ user: id }, req.body, {
    new: true
  });

  console.log(profile.name);
  if (!profile) throw createApiError("User has no profile", 404);

  res.status(201).json(handleResponse({ profile }));
});

const deleteUserProfile = handleAsync(async (req, res) => {
  const profile = await Profile.findOneAndDelete({
    user: req.user._id
  });

  if (!profile) throw createApiError("user profile does not exist", 401);

  res.status(201).json(handleResponse({ profile }));
});

module.exports = {
  addUserProfile,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile
};
