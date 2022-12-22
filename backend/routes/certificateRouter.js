const express = require("express");
const router = express.Router();
const fileExtLimiter = require("../middleware/fileExtLimiter");
const fileUpload = require("express-fileupload");
const upload = require("multer");

const {
  getAllCollections,
  addCollection,
  getCollection,
  getCertificateInCollection,
  addCertficatesToCollection,
  deleteAllCollections,
  deleteCertificate,
  getCertificateStatus,
  updateCertificateDetails,
  updateCertificateStatus,
  verifyCertificate,
  downloadCertificates,
  downloadUnauthorised,
  downloadSingleCertificate,
  downloadSingleCertificateUnauthorised
} = require("../controllers/userCertificateController");
const authentication = require("../middleware/authentication");
const os = require("os");
const multer = require("multer");

router.post("/download", authentication, downloadCertificates);
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
router.get("/", authentication, getAllCollections);
router.post("/", authentication, fileExtLimiter, fileUpload(), addCollection);
router.get("/:collectionId", authentication, getCollection);
router.post("/:collectionId", authentication, addCertficatesToCollection)
router.get("/:certificateId/collection/:collectionId", authentication, getCertificateInCollection)
router.post("/download/unauthorised", downloadUnauthorised);
router.get("/status", authentication, getCertificateStatus);
router.put("/:id", authentication, updateCertificateDetails);
router.delete("/:id", authentication, deleteCertificate);
router.get("verify/:id", verifyCertificate);
router.delete("/", authentication, deleteAllCollections);
router.patch("/status/:id", authentication, updateCertificateStatus);
module.exports = router;
