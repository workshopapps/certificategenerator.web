const express = require('express')
const { createTemplate } = require('../controllers/templateController')
const router = express.Router()

//create template for premium user
router.post("/", createTemplate)


module.exports = router
