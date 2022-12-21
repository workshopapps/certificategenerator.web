const User = require("../models/certificateModel");
const UserBio = require("../models/userModel");
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
  convertCertificate,
  handleZip,
  handleSplitPdf,
  convertSingleCertificate
} = require("../utils/certificate");
const { sendCertificate } = require("../utils/mailing")
const imageToPdf = require("image-to-pdf");

const addCertificate = handleAsync(async (req, res) => {
  const uuidv4 = v4();
  const userId = req.user._id;
  const files = req.files;
  const payload = req.body;

  if (!files && Object.keys(payload).length === 0) {
    throw createApiError("bad request", 400);
  }

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
      nameOfOrganization: item.nameOfOrganization,
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
        nameOfOrganization: payload.nameOfOrganization,
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

  const user = await User.findOne({ userId }).exec();

  if (!user) {
    await User.create({
      userId: userId,
      records: [...certificateData]
    });
  } else {
    user.records = [...user.records, ...certificateData];
    await user.save();
  }

  res
    .status(201)
    .json(
      handleResponse({ certificateData }, "Successfully updated certificate")
    );
});

const deleteUserCertificates = handleAsync(async (req, res) => {
  const userId = req.user._id;
  const user = await UserBio.findById(userId).exec();

  if (!user) throw createApiError("user not found", 404);

  await User.deleteMany({ userId });
  res.status(204).json(handleResponse("Successfully deleted certificated"));
});

const getAllCertificates = handleAsync(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findOne({ userId }).exec();
  if (!user) throw createApiError("user not found", 404);

  const certificates = user.records;
  res.status(200).json(handleResponse({ certificates }));
});

//This is for getting one certificate
const getCertificate = handleAsync(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findOne({ userId });
  if (!user) throw createApiError("user not found", 404);

  const certificateId = req.params.id;
  const certificate = user.records.find(cert => certificateId == cert._id);

  if (!certificate) {
    throw createApiError("Certificate not found", 404);
  }

  return res.status(200).json(handleResponse({ certificate }));
});

const getNoOfCertificatesIssued = handleAsync(async (req, res) => {
  const userId = req.user._id;
  const user = await User.findOne({ userId }).exec();
  const certificates = user.records;

  return res
    .status(200)
    .json(handleResponse({ issuedCertificates: certificates.length }));
});

const deleteCertificate = handleAsync(async (req, res) => {
  const { id: certificateID } = req.params;
  const userId = req.user._id;

  //validate param ID
  if (!certificateID.match(/^[0-9a-fA-F]{24}$/)) {
    throw createApiError("Not a valid certificate ID", 403);
  }

  //delete certificate by ID
  const cert = await User.updateOne(
    { userId: userId },
    { $pull: { records: { _id: certificateID } } },
    { safe: true }
  );

  if (!cert) {
    throw createApiError(`No Certificate with id ${certificateID}`, 404);
  }
  return res
    .status(200)
    .json(handleResponse({ message: `Certificate has been Deleted` }));
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

const getCertificateStatus = handleAsync(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findOne({ userId });
  if (!user) throw createApiError("user not found", 404);

  const certificateId = req.params.id;
  const certificate = user.records.find(cert => cert._id !== certificateId);

  if (!certificate) {
    throw createApiError(`Certificate not found`, 404);
  }

  const certificateStatus = certificate.status;
  return res.status(200).json(handleResponse({ status: certificateStatus }));
});

const updateCertificateDetails = handleAsync(async (req, res) => {
  const userId = req.user._id;
  const { id: certificateId } = req.params;
  const { name, nameOfOrganization, award, description, date, signed, email } =
    req.body;

  //validate and check certificateId is provided
  if (!certificateId.match(/^[0-9a-fA-F]{24}$/)) {
    throw createApiError(
      "Please provide a valid certificateId as path parameter",
      403
    );
  }

  //validate certificate data to be updated
  if (
    name == undefined ||
    nameOfOrganization == undefined ||
    award == undefined ||
    description == undefined ||
    date == undefined ||
    signed == undefined ||
    email == undefined
  ) {
    throw createApiError(
      "Please enter valid certificate details: name, nameOfOrganization, award, description, date, signed, email",
      403
    );
  }

  //update mongodb
  const cert = await User.updateOne(
    { userId: userId, "records._id": certificateId },
    {
      $set: {
        "records.$.name": name,
        "records.$.nameoforganization": nameOfOrganization,
        "records.$.award": award,
        "records.$.description": description,
        "records.$.date": date,
        "records.$.signed": signed,
        "records.$.email": email
      }
    }
  );

  if (!cert) {
    throw createApiError(`No Certificate with id ${certificateId}`, 404);
  }

  return res.status(200).json(
    handleResponse({
      message: `Certificate ID ${certificateId} has been updated`
    })
  );
});

const updateCertificateStatus = handleAsync(async (req, res) => {
  const userId = req.user._id;
  const payload = req.body;

  const user = await User.findOne({ userId });
  if (!user) throw createApiError("user not found", 404);

  const certificateId = req.params.id;
  const certificate = user.records.find(cert => certificateId == cert._id);

  if (!certificate) {
    throw createApiError(`Certificate not found`, 404);
  }

  const certificateStatus = payload.status.toLowerCase();

  const certifiCateStatusTest = ["pending", "issued", "canceled"].some(
    value => {
      return value === certificateStatus;
    }
  );

  if (!certifiCateStatusTest) {
    throw createApiError("invalid status", 400);
  }

  certificate.status = certificateStatus;
  await user.save();

  return res.status(200).json(
    handleResponse({
      message: `${certificate.name} status set to ${certificateStatus}`
    })
  );
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
  certsToConvert.map(async (item) => {
    const path = await convertCertificate(item, template);
    const filePath = await handleSplitPdf([path])
    const email = item.email
    await sendCertificate(email, filePath[0])
  })


})

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
  getAllCertificates,
  addCertificate,
  getCertificate,
  getNoOfCertificatesIssued,
  deleteCertificate,
  verifyCertificate,
  getCertificateStatus,
  updateCertificateDetails,
  updateCertificateStatus,
  deleteUserCertificates,
  downloadCertificates,
  sendCertificates,
  downloadUnauthorised,
  downloadSingleCertificate,
  downloadSingleCertificateUnauthorised
};
