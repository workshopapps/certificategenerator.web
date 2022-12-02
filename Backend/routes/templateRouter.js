const express = require('express')
const multer = require('multer');
const { createTemplate } = require('../controllers/templateController')
const router = express.Router()

const uploader = multer({
   storage: multer.diskStorage({}),
   limits: { fileSize: 500000 }
})

//create template for premium user
router.post("/", uploader.single("file"), createTemplate)


module.exports = router
