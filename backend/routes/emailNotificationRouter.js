const express = require("express");
const {
  emailNotification
} = require("../controllers/emailNotificationController");
const Router = express.Router();
const fileUpload = require("express-fileupload");
const authentication = require("../middleware/authentication");

Router.post(
  "/",
  authentication,
  fileUpload({ useTempFiles: true }),
  emailNotification
);

module.exports = Router;
