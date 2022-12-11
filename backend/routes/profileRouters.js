const express = require("express");
const router = express.Router();

const authentication = require("../middleware/authentication");
const {
  addUserProfile,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  uploadUserAvatar,
  getUserAvatar
} = require("../controllers/profileController");
const fileUpload = require("express-fileupload");

// for getting each user profile
router.get("/", authentication, getUserProfile);

router.get("/avatar", authentication, getUserAvatar);

// for creating each user profile
router.post("/", authentication, addUserProfile);

// Upload user avatar
router.post(
  "/avatar",
  authentication,
  fileUpload({ useTempFiles: true }),
  uploadUserAvatar
);

//for updating userProfile
router.put("/", authentication, updateUserProfile);

router.patch("/", authentication, updateUserProfile);

//for delete userProfile
router.delete("/", authentication, deleteUserProfile);

module.exports = router;
