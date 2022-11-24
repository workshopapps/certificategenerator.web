const express = require('express');
const router = express.Router();

const { getAllCertificates,
    addCertificate,
    getCertificate,
    getNoOfCertificatesIssued } = require('../controllers/userCertificateController');

router.get('/issuedCertificates', getNoOfCertificatesIssued);
router.get('/', getAllCertificates);
router.post('/', addCertificate);
router.get('/:id', getCertificate);

module.exports = router;