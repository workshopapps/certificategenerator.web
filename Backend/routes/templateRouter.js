const express = require('express')
const { createTemplate, getTemplate } = require('../controllers/templateController')
const router = express.Router()

//create template for premium user
router.post("/", createTemplate)

//get template for premium user
router.get("/:id", getTemplate)


module.exports = router
