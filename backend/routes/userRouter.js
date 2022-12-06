const express = require('express')
const { uploadUserBrandKit } = require('../controllers/userController')
const router = express.Router()
const fileUpload = require('express-fileupload');

//create brandkit for premium user
router.put("/brand-kit", fileUpload({useTempFiles: true}), uploadUserBrandKit)


module.exports = router