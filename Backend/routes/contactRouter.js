const express = require('express')
const router = express.Router()
const { getContacts, sendContact } = require('../controllers/contactController.js')

router.get('/', getContacts)
router.post('/', sendContact);

module.exports = router;