const express = require("express");
const fileUpload = require("express-fileupload");
const {
  createTemplate,
  getTemplate,
  getAllTemplates,
  editTemplate,
  deleteTemplate,
  uploadImage
} = require("../controllers/templateController");
const router = express.Router();

//create template for premium user
router.post("/", createTemplate);
router.get("/", getAllTemplates);
router.get("/:templateId", getTemplate);
router.patch("/:templateId", editTemplate);
router.delete("/:templateId", deleteTemplate);
router.post("/images", fileUpload({ useTempFiles: true }), uploadImage);

module.exports = router;
