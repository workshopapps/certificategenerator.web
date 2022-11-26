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

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> 86ad619ae164b2daf428c9dd9ef3f438e9e60dca
