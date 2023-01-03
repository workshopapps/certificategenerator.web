const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  userSignup,
  userLogin,
  refreshToken,
  userLogout,
  forgotPassword,
  changePassword,
  getAuthUrl
} = require("../controllers/authController");
const validateSignUp = require("../middleware/authValidators");

//user sign in
// router.post("/signin", )

//user sign up
router.post("/getAuthUrl", getAuthUrl)
router.post("/signup", validateSignUp, userSignup);
router.post("/login", validateSignUp, userLogin);
router.post("/refreshToken", refreshToken);
router.delete("/logout", userLogout);
router.route("/forgotpassword").post(forgotPassword);
router.route("/changepassword/:userId/:token").post(changePassword);

module.exports = router;
