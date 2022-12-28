const express = require("express");
const router = express.Router();
const fileExtLimiter = require("../middleware/fileExtLimiter");
const fileUpload = require("express-fileupload");
const upload = require("multer");

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
  sendCertificates,
  downloadUnauthorised,
  downloadSingleCertificate,
  downloadSingleCertificateUnauthorised
} = require("../controllers/userCertificateController");
const authentication = require("../middleware/authentication");
const os = require("os");
const multer = require("multer");

router.get("/issuedCertificates", authentication, getNoOfCertificatesIssued);
router.post("/download", authentication, downloadCertificates);
router.post("/sendBulkCertificates", authentication, sendCertificates);
router.post(
  "/download/single",
  authentication,
  upload({ dest: os.tmpdir() }).single("logo"),
  downloadSingleCertificate
);
router.post(
  "/download/unauthorised/single",
  upload({ dest: os.tmpdir() }).single("logo"),
  downloadSingleCertificateUnauthorised
);
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
