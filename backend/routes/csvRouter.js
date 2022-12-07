const express = require("express");
const router = express.Router();
const fileExtLimiter = require("../middleware/fileExtLimiter");
const filePayLoadExist = require("../middleware/filePayLoadExist");
const { handleCsv } = require("../controllers/csvController");
const fileUpload = require('express-fileupload');

router.post("/", fileExtLimiter, fileUpload(), filePayLoadExist, handleCsv);

module.exports = router;
