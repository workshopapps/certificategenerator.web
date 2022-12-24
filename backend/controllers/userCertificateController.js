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
  convertCertificates,
  handleZip,
  handleSplitPdf,
  convertSingleCertificate
} = require("../utils/certificate");
const imageToPdf = require("image-to-pdf");

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
    payload.collectionName.toLowerCase() != collection.collectionName.toLowerCase()
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
  })
  await user.save();
  console.log('i got here')

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
  const { certificateIds = [], template = 1, format = "pdf" } = req.body;

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

  // Generate image for each certificate
  const paths = await convertCertificates(certsToConvert, template);

  switch (format.toLowerCase()) {
    case "pdf":
      return imageToPdf(paths, [931, 600]).pipe(res);

    case "img":
      const buffer = handleZip(paths);
      res.attachment("certificate.zip");
      return res.end(buffer);

    case "pdf-split":
      const pdfPaths = await handleSplitPdf(paths);
      const t_buffer = handleZip(pdfPaths);
      res.attachment("certificate.zip");
      return res.end(t_buffer);

    default:
      // Return certificate to frontend
      return imageToPdf(paths, [1180, 760]).pipe(res);
  }
});

const downloadUnauthorised = handleAsync(async (req, res) => {
  const { certificates, template = 1, format = "pdf" } = req.body;

  // Invalid option provided
  if (!["pdf", "img", "pdf-split"].includes(format.toLowerCase()))
    throw createApiError(
      "Invalid option provided. Option must be one of 'pdf', 'img' and 'pdf-split'",
      400
    );

  // Validate certificates input
  if (!certificates && !Array.isArray(certificates))
    throw createApiError("certificates is required and must be an array", 400);

  // Validate template
  if (typeof template !== "number")
    throw createApiError("template must be a number", 400);

  // Generate image for each certificate
  const paths = await convertCertificates(certificates, template);

  switch (format.toLowerCase()) {
    case "pdf":
      return imageToPdf(paths, [1180, 760]).pipe(res);

    case "img":
      const buffer = handleZip(paths);
      res.attachment("certificate.zip");
      return res.end(buffer);

    case "pdf-split":
      const pdfPaths = await handleSplitPdf(paths);
      const t_buffer = handleZip(pdfPaths);
      res.attachment("certificate.zip");
      return res.end(t_buffer);

    default:
      // Return certificate to frontend
      return imageToPdf(paths, [1180, 760]).pipe(res);
  }
});

const downloadSingleCertificate = handleAsync(async (req, res) => {
  const user = req.user;
  const { certificateId, template = 1, format = "pdf" } = req.body;

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
  if (!mongoose.isValidObjectId(certificateId))
    throw createApiError("Invalid certificate Id", 400);

  // Validate template
  if (typeof Number(template) !== "number")
    throw createApiError("template must be a number", 400);

  const collection = await Certificate.findOne({
    userId: user._id
  });

  // if no certificates return 404
  if (!collection) throw createApiError("Certificate Not Found", 404);

  // if records are empty return 404
  if (!collection.records || collection.records?.length === 0)
    throw createApiError("Certificate Not Found", 404);

  // Get certificates that have ids in certIds
  const cert = collection.records.find(
    certificate => certificate._id.toString() === certificateId
  );

  if (!cert) throw createApiError("Certificate Not Found", 404);

  // Generate image for each certificate
  const paths = await convertSingleCertificate(cert, Number(template), logo);

  switch (format.toLowerCase()) {
    case "pdf":
      return imageToPdf([paths], [931, 600]).pipe(res);

    case "img":
      res.attachment("certificate.img");
      return res.download(paths);

    default:
      // Return certificate to frontend
      return imageToPdf([paths], [1180, 760]).pipe(res);
  }
});

const downloadSingleCertificateUnauthorised = handleAsync(async (req, res) => {
  const {
    template = 1,
    format = "pdf",
    name,
    award,
    signed,
    date,
    description,
    nameoforganization
  } = req.body;

  const certificate = {
    name,
    award,
    signed,
    date,
    description,
    nameoforganization
  };

  const logo = req.file.path;

  console.log(req.file);

  // I did this because I didn't want to rename user globally
  // and I wanted to avoid confusion

  // Invalid option provided
  if (!["pdf", "img"].includes(format.toLowerCase()))
    throw createApiError(
      "Invalid option provided. Option must be one of 'pdf', 'img' and 'pdf-split'",
      400
    );

  // Validate certificates input
  if (!certificate) throw createApiError("Invalid certificate Id", 400);

  // Validate template
  if (typeof Number(template) !== "number")
    throw createApiError("template must be a number", 400);

  // Generate image for each certificate
  const paths = await convertSingleCertificate(
    certificate,
    Number(template),
    logo
  );

  switch (format.toLowerCase()) {
    case "pdf":
      return imageToPdf([paths], [931, 600]).pipe(res);

    case "img":
      res.attachment("certificate.img");
      return res.download(paths);

    default:
      // Return certificate to frontend
      return imageToPdf([paths], [1180, 760]).pipe(res);
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
  downloadUnauthorised,
  downloadSingleCertificate,
  downloadSingleCertificateUnauthorised
};
