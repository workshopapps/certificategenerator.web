const express = require("express");
const router = express.Router();
const fileExtLimiter = require("../middleware/fileExtLimiter");

const {
  getAllCertificates,
  addCertificate,
  getCertificate,
  getNoOfCertificatesIssued,
  deleteCertificate,
  getCertificateStatus,
  updateCertificateDetails,
  updateCertificateStatus,
} = require("../controllers/userCertificateController");
const authentication = require("../middleware/authentication");

router.get("/issuedCertificates", authentication, getNoOfCertificatesIssued);
router.get("/", authentication, getAllCertificates);
router.get("/status", authentication, getCertificateStatus);
router.post("/", authentication, fileExtLimiter, addCertificate);
router.get("/:id", authentication, getCertificate);
router.put("/:id", authentication, updateCertificateDetails);
router.delete("/:id", authentication, deleteCertificate);
router.patch("/status/:id", authentication, updateCertificateStatus);
module.exports = router;
