const express = require("express");
const router = express.Router();

const authentication = require("../middleware/authentication");
const {
  addUserProfile,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
} = require("../controllers/profileController");

// for getting each user profile
router.get("/", authentication, getUserProfile);

// for creating each user profile
router.post("/", authentication, addUserProfile);

//for updating userProfile
router.put("/", authentication, updateUserProfile);

router.patch("/", authentication, updateUserProfile);

//for delete userProfile
router.delete("/:id", authentication, deleteUserProfile);

module.exports = router;
