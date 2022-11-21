const express = require('express')
const router = express.Router()
const {body} = require("express-validator")
const { userSignup } = require('../controllers/authController')
const {validateSignUp} = require("../middlewares/authValidators")

//user sign in
// router.post("/signin", )

//user sign up
router.post("/signup", validateSignUp, userSignup)

module.exports = router