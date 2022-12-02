const express = require("express");
const router = express.Router();

const {
  addUserProfile,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/profileController");
const authentication = require("../middleware/authentication");

// for getting each user profile
router.get("/", authentication, getUserProfile);

// for creating each user profile
router.post("/", authentication, addUserProfile);

//for updating userProfile
router.put("/", authentication, updateUserProfile);

module.exports = router;
