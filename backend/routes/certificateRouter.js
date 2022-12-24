//modules
const express = require("express");
const os = require("os");

//middlewares
const fileExtLimiter = require("../middleware/fileExtLimiter");
const fileUpload = require("express-fileupload");
const upload = require("multer");
const authentication = require("../middleware/authentication");

//controllers
const {
  addCollection,
  addCertficatesToCollection,
  getAllCollections,
  getCollection,
  getCertificateInCollection,
  updateCollectionName,
  updateCertificateDetails,
  updateCertificateStatus,
  deleteAllCollections,
  deleteCollection,
  deleteCertificateInCollection,
  verifyCertificate,
  downloadCertificates,
  sendCertificates,
  downloadUnauthorised,
  downloadSingleCertificate,
  downloadSingleCertificateUnauthorised
} = require("../controllers/userCertificateController");

//routes
const router = express.Router();

//get reqs
router.get("/", authentication, getAllCollections);
router.get("/collection/:collectionId", authentication, getCollection);
router.get(
  "/:certificateId/collection/:collectionId",
  authentication,
  getCertificateInCollection
);
router.get("verify/:id", verifyCertificate);

//post reqs
router.post(
  "/collection",
  authentication,
  fileExtLimiter,
  fileUpload(),
  addCollection
);
router.post("/collection/:collectionId", authentication, fileUpload(), addCertficatesToCollection);
router.post("/download", authentication, downloadCertificates);

router.post("/download/unauthorised", downloadUnauthorised);

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

//put/patch reqs
router.put("/collection/:collectionId", authentication, updateCollectionName);
router.put(
  "/:certificateId/collection/:collectionId",
  authentication,
  updateCertificateDetails
);
router.patch(
  "/status/:certificateId/collection/:collectionId",
  authentication,
  updateCertificateStatus
);

//delete reqs
router.delete("/", authentication, deleteAllCollections);
router.delete("/collection/:collectionId", authentication, deleteCollection);
router.delete(
  "/:certificateId/collection/:collectionId",
  authentication,
  deleteCertificateInCollection
);

module.exports = router;
