const express = require('express')
const router = express.Router()
const fileExtLimiter = require('../middleware/fileExtLimiter')
const filePayLoadExist = require('../middleware/filePayLoadExist')
const { handleCsv } = require('../controllers/csvController');


router.post('/', fileExtLimiter, filePayLoadExist, handleCsv)

module.exports = router;