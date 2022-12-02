const express = require("express");
const router = express.Router();
const { sendVerEmail, verify } = require("../controllers/verifyEmailController")


router.get("/", sendVerEmail);
router.get("/verify", verify);

module.exports = router;