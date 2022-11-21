const express = require('express');
const router = express.Router();

const { getAllCertificates, addCertificate } = require('../controllers/userCertificateController');

router.get('/', getAllCertificates);
router.post('/', addCertificate);

module.exports = router;