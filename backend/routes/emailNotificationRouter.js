const express = require('express');
const { emailNotification } = require('../controllers/emailNotificationController');
const Router = express.Router();
const fileUpload = require('express-fileupload');

Router.post("/", fileUpload({useTempFiles: true}), emailNotification)

module.exports = Router