const express = require("express");
const router = express.Router();

const {
  addUserProfile,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/profileController");

// for getting each user profile
router.get("/", getUserProfile);

// for creating each user profile
router.post("/", addUserProfile);

//for updating userProfile
router.put('/', updateUserProfile);

module.exports = router;