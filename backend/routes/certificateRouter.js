const express = require("express");
const router = express.Router();
const fileExtLimiter = require("../middleware/fileExtLimiter");
const fileUpload = require("express-fileupload");

const {
  getAllCertificates,
  addCertificate,
  getCertificate,
  getNoOfCertificatesIssued,
  deleteCertificate,
  deleteUserCertificates,
  getCertificateStatus,
  updateCertificateDetails,
  updateCertificateStatus,
  verifyCertificate,
  downloadCertificates,
  downloadUnauthorised
} = require("../controllers/userCertificateController");
const authentication = require("../middleware/authentication");

router.get("/issuedCertificates", authentication, getNoOfCertificatesIssued);
router.post("/download", authentication, downloadCertificates);
router.post("/download/unauthorised", downloadUnauthorised);
router.get("/", authentication, getAllCertificates);
router.get("/status", authentication, getCertificateStatus);
router.post("/", authentication, fileExtLimiter, fileUpload(), addCertificate);
router.get("/:id", authentication, getCertificate);
router.put("/:id", authentication, updateCertificateDetails);
router.delete("/:id", authentication, deleteCertificate);
router.get("verify/:id", verifyCertificate);
router.delete("/", authentication, deleteUserCertificates);
router.patch("/status/:id", authentication, updateCertificateStatus);
module.exports = router;
