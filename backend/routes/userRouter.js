const express = require('express')
const { uploadUserBrandKit, getUserBrandKit } = require('../controllers/userController')
const router = express.Router()
const fileUpload = require('express-fileupload');

//create brandkit for premium user
router.put("/brand-kit", fileUpload({useTempFiles: true}), uploadUserBrandKit)

//create brandkit for premium user
router.get("/brand-kit", getUserBrandKit)


module.exports = router