const express = require('express');
const router = express.Router();

const { getAllCertificates, addCertificate, getNoOfCertificatesIssued, deleteSingleCertificate} = require('../controllers/userCertificateController');

router.get('/', getAllCertificates);
router.post('/', addCertificate);
router.get('/issuedCertificate', getNoOfCertificatesIssued)
router.delete('/deleteCertificate/:id', deleteSingleCertificate)

module.exports = router;