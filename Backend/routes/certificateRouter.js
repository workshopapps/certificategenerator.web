const express = require('express');
const router = express.Router();

const { getAllCertificates, addCertificate, getCertificate, deleteCertificate } = require('../controllers/userCertificateController');

router.get('/', getAllCertificates);
router.post('/', addCertificate);
router.post('/:id', getCertificate);
router.delete('/:id', deleteCertificate);

module.exports = router;