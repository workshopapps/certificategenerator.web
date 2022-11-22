const express = require('express');
const router = express.Router();

const { getAllCertificates, addCertificate, getCertificate } = require('../controllers/userCertificateController');

router.get('/', getAllCertificates);
router.post('/', addCertificate);
router.post('/:id', getCertificate);

module.exports = router;