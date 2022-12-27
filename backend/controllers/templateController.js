const Template = require("../models/templateModel");
const cloudinary = require("cloudinary").v2;
const {
  handleAsync,
  handleResponse,
  createApiError
} = require("../utils/helpers");
const Joi = require("joi");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const createTemplate = handleAsync(async (req, res) => {
  const { texts, backgroundImage, elements, fontUrl } = req.body;

  //Define validate schema
  const schema = Joi.object({
    fontUrl: Joi.string().uri().required(),
    texts: Joi.array().items(
      Joi.object({
        width: Joi.number(),
        top: Joi.number().required(),
        left: Joi.number().required(),
        text: Joi.string(),
        isAttribute: Joi.boolean(),
        fontSize: Joi.number().required(),
        fontWeight: Joi.number(),
        fontFamily: Joi.string().required(),
        color: Joi.string(),
        attribute: Joi.string().allow(
          "name",
          "nameoforganization",
          "description",
          "award",
          "signed",
          "date",
          "uuid",
          "link"
        )
      })
    ),
    elements: Joi.array().items(
      Joi.object({
        width: Joi.number(),
        height: Joi.number(),
        top: Joi.number().required(),
        left: Joi.number().required(),
        url: Joi.string().uri(),
        isLogo: Joi.boolean()
      })
    ),
    backgroundImage: Joi.string().uri().required()
  });

  // Validate inputs against schema
  const { error } = schema.validate({
    texts,
    backgroundImage,
    elements,
    fontUrl
  });

  // Bad request
  if (error) throw createApiError(error.message, 400);

  const template = new Template({ texts, backgroundImage, elements, fontUrl });

  await template.save();

  res.status(201).json(handleResponse({ template: template.format() }));
});

const getTemplate = handleAsync(async (req, res) => {
  const { templateId } = req.params;

  // Get template with id
  const template = await Template.findById(templateId);

  // 404 Template not found
  if (!template) throw createApiError("Template not found", 404);

  res.status(200).json(handleResponse({ template: template.format() }));
});

const getAllTemplates = handleAsync(async (req, res) => {
  // Get all templates from db
  const templates = await Template.find().select(
    "elements texts backgroundImage fontUrl"
  );

  res.status(200).json(handleResponse({ templates }));
});

const deleteTemplate = handleAsync(async (req, res) => {
  const { templateId } = req.params;

  // Find template with id
  const template = await Template.findById(templateId);

  // 404 Template not found
  if (!template) throw createApiError("Template not found", 404);

  // Delete template
  await template.deleteOne();

  res.status(200).json(handleResponse({ deleted: template._id }));
});

const editTemplate = handleAsync(async (req, res) => {
  const { templateId } = req.params;
  const { texts, backgroundImage, elements } = req.body;

  // find template with id
  const template = await Template.findById(templateId);

  // Template not found
  if (!template) throw createApiError("Template not found", 404);

  //Define validate schema
  const schema = Joi.object({
    texts: Joi.array().items(
      Joi.object({
        width: Joi.number(),
        top: Joi.number().required(),
        left: Joi.number().required(),
        isAttribute: Joi.boolean(),
        text: Joi.string(),
        fontSize: Joi.number().required(),
        fontWeight: Joi.number(),
        fontFamily: Joi.string().required(),
        color: Joi.string(),
        attribute: Joi.string()
          .allow(
            "name",
            "nameoforganization",
            "description",
            "award",
            "signed",
            "date",
            "uuid",
            "link"
          )
          .only()
      })
    ),
    elements: Joi.array().items(
      Joi.object({
        width: Joi.number(),
        height: Joi.number(),
        top: Joi.number().required(),
        left: Joi.number().required(),
        url: Joi.string().uri(),
        isLogo: Joi.boolean()
      })
    ),
    backgroundImage: Joi.string().uri()
  });

  // Validate inputs against schema
  const { error } = schema.validate({
    texts,
    backgroundImage,
    elements,
    fontUrl
  });

  // Bad request
  if (error) throw createApiError(error.message, 400);

  // Update template
  template.texts = texts || template.texts;
  template.backgroundImage = backgroundImage || template.backgroundImage;
  template.elements = elements || template.elements;
  template.fontUrl = fontUrl || template.fontUrl;

  // Save update
  await template.save();

  res.status(200).json(handleResponse({ template: template.format() }));
});

const uploadImage = handleAsync(async (req, res) => {
  const image = req.files?.file;

  // Bad request
  if (!image) throw createApiError("file is required", 400);

  // Upload image to cloudinary
  const result = await cloudinary.uploader.upload(image.tempFilePath);

  // respond with image url to user
  res.status(200).json(handleResponse({ image: result.secure_url }));
});

module.exports = {
  createTemplate,
  getTemplate,
  getAllTemplates,
  deleteTemplate,
  editTemplate,
  uploadImage
};
