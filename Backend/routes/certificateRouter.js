const express = require('express');
const router = express.Router();

const { getAllCertificates, addCertificate, getNoOfCertificatesIssued} = require('../controllers/userCertificateController');

router.get('/', getAllCertificates);
router.post('/', addCertificate);
router.get('/issuedCertificate', getNoOfCertificatesIssued)

module.exports = router;