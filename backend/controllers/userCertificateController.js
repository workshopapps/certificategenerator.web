const User = require("../models/certificateModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const csvToJson = require("csvtojson");
const { v4 } = require("uuid");
const { isValidJsonOutput } = require("../utils/validation");
const {
  handleAsync,
  createApiError,
  handleResponse
} = require("../utils/helpers");
const {
  handleZip,
  GenerateCertificateImages,
  GenerateCertificatePdfs
} = require("../utils/certificate");
const { sendCertificate } = require("../utils/mailing");
const Template = require("../models/templateModel");
const Joi = require("joi");

const addCollection = handleAsync(async (req, res) => {
  const uuidv4 = v4();
  const userId = req.user._id;
  const files = req.files;
  const payload = req.body;

  if (files && files == undefined) throw createApiError("bad request", 400);

  if (!files && Object.keys(payload).length === 0) {
    throw createApiError("bad request", 400);
  }

  if (!payload.collectionName)
    throw createApiError("Collection Name required", 400);

  let certificateData;
  if (files) {
    const csvFile = files.file.data;
    const csvData = Buffer.from(csvFile).toString();
    certificateData = await csvToJson().fromString(csvData);

    if (!isValidJsonOutput(certificateData)) {
      throw createApiError("Invalid input from uploaded csv file", 400);
    }

    //append uuid and link to the certificate object
    certificateData = certificateData.map(data => {
      let id = v4();
      return {
        ...data,
        uuid: id,
        link: `https://certgo.hng.tech/single_preview?uuid=${id}`
      };
    });
  } else if (Array.isArray(payload)) {
    certificateData = payload.map(item => ({
      name: item.name,
      nameoforganization: item.nameoforganization,
      award: item.award,
      email: item.email,
      description: item.description,
      date: item.date,
      signed: item.signed,
      uuid: uuidv4,
      link: `https://certgo.hng.tech/single_preview?uuid=${uuidv4}`
    }));
  } else if (payload) {
    certificateData = [
      {
        name: payload.name,
        nameoforganization: payload.nameoforganization,
        award: payload.award,
        email: payload.email,
        description: payload.description,
        date: payload.date,
        signed: payload.signed,
        uuid: uuidv4,
        link: `https://certgo.hng.tech/single_preview?uuid=${uuidv4}`
      }
    ];
  } else throw createApiError("bad request", 400);

  let newCollection;
  if (Array.isArray(payload)) {
    newCollection = {
      collectionName: payload[0].collectionName,
      records: certificateData
    };
  } else {
    newCollection = {
      collectionName: payload.collectionName,
      records: certificateData
    };
  }

  const user = await User.findOne({ userId }).exec();

  if (!user) {
    await User.create({
      userId: userId,
      collections: newCollection
    });
  } else {
    const collectionNameExist = user.collections.find(
      item =>
        item.collectionName.toLowerCase() ==
        payload.collectionName.toLowerCase()
    );
    if (collectionNameExist)
      throw createApiError("collection name already exist", 400);
    user.collections = [...user.collections, newCollection];
    await user.save();
  }
  res
    .status(201)
    .json(handleResponse(newCollection, "Successfully uploaded collection"));
});

const addCertficatesToCollection = handleAsync(async (req, res) => {
  const userId = req.user._id;
  const uuidv4 = v4();
  const files = req.files;
  const payload = req.body;
  const collectionId = req.params.collectionId;

  const user = await User.findOne({ userId }).exec();
  if (!user) throw createApiError("user not found", 404);

  const collection = user.collections.find(
    certCollection => collectionId == certCollection._id
  );
  if (!collection) throw createApiError("collection not found", 404);

  if (files && files == undefined) throw createApiError("No csv uploaded", 400);

  if (!files && Object.keys(payload).length === 0) {
    throw createApiError("bad request", 400);
  }

  if (
    payload.collectionName &&
    payload.collectionName.toLowerCase() !=
      collection.collectionName.toLowerCase()
  )
    throw createApiError("Invalid collection name", 400);

  let certificateData;
  if (files) {
    const csvFile = files.file.data;
    const csvData = Buffer.from(csvFile).toString();
    certificateData = await csvToJson().fromString(csvData);

    if (!isValidJsonOutput(certificateData)) {
      throw createApiError("Invalid input from uploaded csv file", 400);
    }

    //append uuid and link to the certificate object
    certificateData = certificateData.map(data => {
      let id = v4();
      return {
        ...data,
        uuid: id,
        link: `https://certgo.hng.tech/single_preview?uuid=${id}`
      };
    });
  } else if (Array.isArray(payload)) {
    certificateData = payload.map(item => ({
      name: item.name,
      nameoforganization: item.nameoforganization,
      award: item.award,
      email: item.email,
      description: item.description,
      date: item.date,
      signed: item.signed,
      uuid: uuidv4,
      link: `https://certgo.hng.tech/single_preview?uuid=${uuidv4}`
    }));
  } else if (payload) {
    certificateData = [
      {
        name: payload.name,
        nameoforganization: payload.nameoforganization,
        award: payload.award,
        email: payload.email,
        description: payload.description,
        date: payload.date,
        signed: payload.signed,
        uuid: uuidv4,
        link: `https://certgo.hng.tech/single_preview?uuid=${uuidv4}`
      }
    ];
  } else throw createApiError("bad request", 400);

  collection.records = [...collection.records, ...certificateData];
  await user.save();
  res
    .status(201)
    .json(
      handleResponse({ certificateData }, "Successfully updated certificate")
    );
});

const getAllCollections = handleAsync(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findOne({ userId }).exec();
  if (!user) throw createApiError("No collection found", 404);

  const collections = user.collections;
  res.status(200).json(handleResponse({ collections }));
});

const getCollection = handleAsync(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findOne({ userId });
  if (!user) throw createApiError("No collection found", 404);

  const collectionId = req.params.collectionId;
  const collection = user.collections.find(
    certCollection => collectionId == certCollection._id
  );

  if (!collection) {
    throw createApiError("collection not found", 404);
  }

  return res.status(200).json(handleResponse({ collection }));
});

const getCertificateInCollection = handleAsync(async (req, res) => {
  const userId = req.user._id;
  const collectionId = req.params.collectionId;
  const certificateId = req.params.certificateId;

  const user = await User.findOne({ userId }).exec();
  if (!user) throw createApiError("No collection found", 404);

  const collection = user.collections.find(
    certCollection => collectionId == certCollection._id
  );
  if (!collection) throw createApiError("collection not found", 404);

  const certificate = collection.records.find(
    cert => certificateId == cert._id
  );
  if (!certificate) throw createApiError("certificate not found", 404);

  return res.status(200).json(handleResponse({ certificate }));
});

const updateCollectionName = handleAsync(async (req, res) => {
  const userId = req.user._id;
  const collectionId = req.params.collectionId;
  const payload = req.body;

  const user = await User.findOne({ userId });
  if (!user) throw createApiError("No collection found", 404);

  const collection = user.collections.find(item => collectionId == item._id);

  if (!collection) {
    throw createApiError("collection not found", 404);
  }

  const newCollectionName = payload.collectionName;
  collection.collectionName = newCollectionName;
  await user.save();

  return res
    .status(200)
    .json(handleResponse({ message: "collection name successfully updated" }));
});

const updateCertificateDetails = handleAsync(async (req, res) => {
  const userId = req.user._id;
  const collectionId = req.params.collectionId;
  const certificateId = req.params.certificateId;
  const payload = req.body;

  const validateCertificateBody = [
    payload.name,
    payload.nameoforganization,
    payload.award,
    payload.description,
    payload.date,
    payload.signed,
    payload.email
  ].every(item => item == undefined || item == null);

  if (validateCertificateBody)
    throw createApiError("Fill all required fields", 422);

  const user = await User.findOne({ userId }).exec();
  if (!user) throw createApiError("No collection found", 404);

  const collection = user.collections.find(
    certCollection => collectionId == certCollection._id
  );
  if (!collection) throw createApiError("collection not found", 404);

  const certificate = collection.records.find(
    cert => certificateId == cert._id
  );
  if (!certificate) throw createApiError("certificate not found", 404);

  certificate.update({
    name: payload.name,
    nameoforganization: payload.nameoforganization,
    award: payload.award,
    description: payload.description,
    date: payload.date,
    signed: payload.signed,
    email: payload.email
  });
  await user.save();
  console.log("i got here");

  return res.status(200).json(
    handleResponse({
      message: `Certificate ID ${certificateId} has been updated`
    })
  );
});

const updateCertificateStatus = handleAsync(async (req, res) => {
  const userId = req.user._id;
  const collectionId = req.params.collectionId;
  const certificateId = req.params.certificateId;
  const payload = req.body;

  const user = await User.findOne({ userId }).exec();
  if (!user) throw createApiError("No collection found", 404);

  const collection = user.collections.find(
    certCollection => collectionId == certCollection._id
  );
  if (!collection) throw createApiError("collection not found", 404);

  const certificate = collection.records.find(
    cert => certificateId == cert._id
  );
  if (!certificate) throw createApiError("certificate not found", 404);

  const certificateStatus = payload.status.toLowerCase();

  const certifiCateStatusTest = ["pending", "issued", "canceled"].some(
    value => {
      return value === certificateStatus;
    }
  );

  if (!certifiCateStatusTest) {
    throw createApiError("invalid status", 400);
  }

  certificate.status = payload.status;
  await user.save();

  return res.status(200).json(
    handleResponse({
      message: `${certificate.name} status set to ${certificateStatus}`
    })
  );
});

const deleteAllCollections = handleAsync(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findOne({ userId }).exec();
  if (!user) throw createApiError("user not found", 404);

  const collections = user.collections;

  user.remove({ collections });
  res
    .status(204)
    .json(handleResponse({ message: "Successfully deleted all collections" }));
});

const deleteCollection = handleAsync(async (req, res) => {
  const userId = req.user._id;
  const collectionId = req.params.collectionId;

  const user = await User.findOne({ userId }).exec();
  if (!user) throw createApiError("user not found", 404);

  const collection = user.collections.find(item => item._id == collectionId);
  if (!collection) throw createApiError("collection not found", 404);

  user.collections.remove({ collection });
  await user.save();

  res
    .status(204)
    .json(handleResponse({ message: "Successfully deleted collection" }));
});

const deleteCertificateInCollection = handleAsync(async (req, res) => {
  const userId = req.user._id;
  const collectionId = req.params.collectionId;
  const certificateId = req.params.certificateId;

  const user = await User.findOne({ userId }).exec();
  if (!user) throw createApiError("user not found", 404);

  const collection = user.collections.find(item => item._id == collectionId);
  if (!collection) throw createApiError("collection not found", 404);

  const certificate = collection.records.find(
    item => item._id == certificateId
  );
  if (!certificate) throw createApiError("certificate not found", 404);

  collection.records.remove({ certificate });
  await user.save();

  res
    .status(204)
    .json(handleResponse({ message: "Successfully deleted certificate" }));
});

const verifyCertificate = handleAsync(async (req, res) => {
  const { id: certificateID } = req.params;

  if (!certificateID.match(/^[0-9a-fA-F]{24}$/)) {
    throw createApiError("Not a valid certificate ID", 403);
  }

  //delete certificate by ID
  const cert = await User.findOne({ _id: certificateID });

  if (!cert) {
    throw createApiError(`Not a Valid Certificate`, 404);
  }
  return res
    .status(200)
    .json(handleResponse({ message: `Certificate Is Valid` }));
});

const downloadCertificates = handleAsync(async (req, res) => {
  const user = req.user;
  const { templateId, format } = req.body;
  const { collectionId } = req.params;

  // I did this because I didn't want to rename user globally
  // and I wanted to avoid confusion
  const Certificate = User;

  // Validate template
  if (!mongoose.isValidObjectId(templateId))
    throw createApiError("Invalid templateId", 400);

  const certificates = await Certificate.findOne({
    userId: user._id
  });

  // if no certificates return 404
  if (!certificates || !certificates.collections)
    throw createApiError("User has no certificates", 404);

  const collection = certificates.collections.find(
    value => value._id.toString() == collectionId
  );

  // if no certificates return 404
  if (!collection) throw createApiError("Collection Not Found", 404);

  const template = await Template.findById(templateId);

  if (!template) throw createApiError("Invalid template id", 400);

  switch (format.toLowerCase()) {
    case "img":
      // Generate image for each certificate
      const paths = await GenerateCertificateImages(
        collection.records,
        template.raw
      );
      const buffer = handleZip(paths);
      res.attachment("certificate.zip");
      return res.end(buffer);

    case "pdf":
    default:
      const pdfPaths = await GenerateCertificatePdfs(
        collection.records,
        template.raw
      );
      const t_buffer = handleZip(pdfPaths);
      res.attachment("certificate.zip");
      return res.end(t_buffer);
  }
});

const sendCertificates = handleAsync(async (req, res) => {
  const user = req.user;
  const { certificateIds = [], template = 2, format = "pdf" } = req.body;

  // I did this because I didn't want to rename user globally
  // and I wanted to avoid confusion
  const Certificate = User;

  // Invalid option provided
  if (!["pdf", "img", "pdf-split"].includes(format.toLowerCase()))
    throw createApiError(
      "Invalid option provided. Option must be one of 'pdf', 'img' and 'pdf-split'",
      400
    );

  // Validate certificates input
  if (!Array.isArray(certificateIds))
    throw createApiError("certificateId is required and must be an array", 400);

  // Validate template
  if (typeof template !== "number")
    throw createApiError("template must be a number", 400);

  const collection = await Certificate.findOne({
    userId: user._id
  });

  // if no certificates return 404
  if (!collection) throw createApiError("User has no certificates", 404);

  // if records are empty return 404
  if (!collection.records || collection.records?.length === 0)
    throw createApiError("User has no certificates", 404);

  // filter out invalid certificate ids
  const certIds = certificateIds.filter(certId =>
    mongoose.isValidObjectId(certId)
  );

  // Get certificates that have ids in certIds
  const certs = collection.records.filter(certificate =>
    certIds.includes(certificate._id.toString())
  );

  // if certs is empty, convert all certificates in user records
  const certsToConvert = certs.length > 0 ? certs : collection.records;

  certsToConvert.map(async item => {
    const path = await convertCertificate(item, template);
    const filePath = await handleSplitPdf([path]);
    const email = item.email;
    await sendCertificate(email, filePath[0]);
  });

  res.status(201).json({ message: "Successfully Sent certificate" });
});

const downloadUnauthorised = handleAsync(async (req, res) => {
  const { certificates, templateId, format } = req.body;

  const schema = Joi.object({
    format: Joi.string().allow("pdf", "img").only().default("pdf"),
    templateId: Joi.string().required(),
    certificates: Joi.array()
      .min(1)
      .items(
        Joi.object({
          name: Joi.string().required(),
          award: Joi.string().required(),
          signed: Joi.string().required(),
          date: Joi.string().required(),
          email: Joi.string().email(),
          description: Joi.string().required(),
          nameoforganization: Joi.string().required()
        })
      )
      .required()
  });

  // Validate inputs
  const { error } = schema.validate(req.body);

  if (error) throw createApiError(error.message, 400);

  const template = await Template.findById(templateId);

  if (!template) throw createApiError("Invalid template id", 400);

  switch (format.toLowerCase()) {
    case "img":
      // Generate image for each certificate
      const paths = await GenerateCertificateImages(certificates, template.raw);
      const buffer = handleZip(paths);
      return res.end(buffer);

    case "pdf":
    default:
      const pdfPaths = await GenerateCertificatePdfs(
        certificates,
        template.raw
      );
      const t_buffer = handleZip(pdfPaths);
      return res.end(t_buffer);
  }
});

const downloadSingleCertificate = handleAsync(async (req, res) => {
  const user = req.user;
  const { certificateId, collectionId } = req.params;

  const { templateId, format = "pdf" } = req.body;

  // I did this because I didn't want to rename user globally
  // and I wanted to avoid confusion
  const Certificate = User;

  // Invalid format provided
  if (!["pdf", "img"].includes(format.toLowerCase()))
    throw createApiError(
      "Invalid format provided. Option must be one of 'pdf', 'img'",
      400
    );

  // Validate certificates input
  if (!mongoose.isValidObjectId(templateId))
    throw createApiError("Invalid template Id", 400);

  const certificates = await Certificate.findOne({
    userId: user._id
  });

  // if no certificates return 404
  if (!certificates || !certificates.collections)
    throw createApiError("User has no certificates", 404);

  const collection = certificates.collections.find(
    certCollection => collectionId == certCollection._id
  );

  if (!collection) throw createApiError("collection not found", 404);

  const certificate = collection.records.find(
    cert => certificateId == cert._id
  );

  if (!certificate) throw createApiError("certificate not found", 404);

  const template = await Template.findById(templateId);

  if (!template) throw createApiError("Invalid template id", 400);

  // Generate image for each certificate
  switch (format.toLowerCase()) {
    case "img":
      // Generate image for each certificate
      const path = await GenerateCertificateImages(
        certificate,
        template.raw,
        req.user.avatar
      );
      return res.download(path);

    case "pdf":
    default:
      const pdfPath = await GenerateCertificatePdfs(
        certificate,
        template.raw,
        req.user.avatar
      );
      return res.download(pdfPath);
  }
});

const downloadSingleCertificateUnauthorised = handleAsync(async (req, res) => {
  const logo = req.file?.path;

  const schema = Joi.object({
    templateId: Joi.string().required(),
    format: Joi.string().allow("pdf", "img").only().default("pdf"),
    name: Joi.string().required(),
    award: Joi.string().required(),
    signed: Joi.string().required(),
    date: Joi.string().required(),
    email: Joi.string().email().required(),
    description: Joi.string().required(),
    nameoforganization: Joi.string().required()
  });

  // Validate inputs against mongoose schema
  const { error } = schema.validate(req.body);

  if (error) throw createApiError(error.message, 400);

  const { templateId, format, ...certificate } = req.body;

  const template = await Template.findById(templateId);

  if (!template) throw createApiError("Invalid template Id", 400);

  switch (format.toLowerCase()) {
    case "img":
      // Generate image for each certificate
      const path = await GenerateCertificateImages(
        certificate,
        template.raw,
        logo
      );
      return res.download(path);

    case "pdf":
    default:
      const pdfPath = await GenerateCertificatePdfs(
        certificate,
        template.raw,
        logo
      );
      return res.download(pdfPath);
  }
});

module.exports = {
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
};
