const User = require("../models/userModel");
const {
  handleAsync,
  createApiError,
  handleResponse
} = require("../utils/helpers");

const updateUserPlan = handleAsync(async (req, res) => {
  const userId = req.user._id;
  const payload = req.body;

  if (!payload) {
    throw createApiError("Bad request", 400);
  }

  const user = await User.findOne({ _id: userId }).exec();

  if (!user) {
    throw createApiError("user does not exist", 400);
  }

  const newPlan = payload.plan.toLowerCase();

  const pricingPlanTest = ["basic", "standard", "premium"].some(value => {
    return value === newPlan;
  });

  if (!pricingPlanTest) {
    throw createApiError("invalid plan", 400);
  }

  user.subscription = newPlan;
  await user.save();

  res
    .status(200)
    .json(handleResponse(`${user.name} plan upgraded to ${newPlan}`));
});

module.exports = {
  updateUserPlan
};
