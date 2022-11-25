const express = require('express');
const router = express.Router();
const fileExtLimiter = require('../middleware/fileExtLimiter')

const { getAllCertificates,
    addCertificate,
    getCertificate,
    getNoOfCertificatesIssued,
    deleteCertificate } = require('../controllers/userCertificateController');

router.get('/issuedCertificates', getNoOfCertificatesIssued);
router.get('/', getAllCertificates);
router.post('/', fileExtLimiter, addCertificate);
router.get('/:id', getCertificate);
router.delete('/:id', deleteCertificate);

module.exports = router;