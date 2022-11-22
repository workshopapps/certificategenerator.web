const express = require('express');
const router = express.Router();

const { getAllCertificates,
    addCertificate,
    getCertificate,
    getNoOfCertificatesIssued } = require('../controllers/userCertificateController');

router.get('/', getAllCertificates);
router.post('/', addCertificate);
router.post('/:id', getCertificate);
router.get('/issuedCertificates', getNoOfCertificatesIssued);

module.exports = router;