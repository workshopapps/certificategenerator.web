const express = require('express')
const router = express.Router()
const fileExtLimiter = require('../middleware/fileExtLimiter')
const filePayLoadExist = require('../middleware/filePayLoadExist')
const { handleCsv } = require('../controllers/csvController');
const multer = require('multer')
const os = require('os')
const upload = multer({dest:os.tmpdir()})

router.post('/',upload.single('file'), fileExtLimiter, filePayLoadExist, handleCsv)

module.exports = router;