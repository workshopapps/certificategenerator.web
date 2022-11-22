const express = require('express');
const router = express.Router();

const { getAllCertificates,
    addCertificate,
    getCertificate,
    getNoOfCertificatesIssued } = require('../controllers/userCertificateController');

router.get('/issuedCertificates', getNoOfCertificatesIssued);
router.get('/:id', getCertificate);
router.get('/', getAllCertificates);
router.post('/', addCertificate);

module.exports = router;