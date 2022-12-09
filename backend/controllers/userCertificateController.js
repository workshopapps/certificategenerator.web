const User = require("../models/certificateModel");
const UserBio = require("../models/userModel");
const jwt = require("jsonwebtoken");
const csvToJson = require("csvtojson");
const { v4 } = require("uuid");
const { isValidJsonOutput } = require("../utils/validation");
const {
  handleAsync,
  createApiError,
  handleResponse
} = require("../utils/helpers");

const addCertificate = handleAsync(async (req, res) => {
  const uuidv4 = v4();
  const userId = req.user._id;
  const files = req.files;
  const payload = req.body;

  if (!files && Object.keys(payload).length === 0) {
    throw createApiError("bad request", 400)
  }

  let certificateData;
  if (files) {
    const csvFile = files.file.data;
    const csvData = Buffer.from(csvFile).toString();
    certificateData = await csvToJson().fromString(csvData);

    if (!isValidJsonOutput(certificateData)) {
      throw createApiError("Invalid input from uploaded csv file", 400)
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
  } else throw createApiError("bad request", 400)

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

  if (!user) throw createApiError("user not found", 404)

  await User.deleteMany({ userId });
  res.status(204).json(handleResponse("Successfully deleted certificated"));
});

const getAllCertificates = handleAsync(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findOne({ userId }).exec();
  if (!user) throw createApiError("user not found", 404)

  const certificates = user.records;
  res.status(200).json(handleResponse({ certificates }));
});

//This is for getting one certificate
const getCertificate = handleAsync(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findOne({ userId });
  if (!user) throw createApiError("user not found", 404)

  const certificateId = req.params.id;
  const certificate = user.records.find(cert => certificateId == cert._id);

  if (!certificate) {
    throw createApiError("Certificate not found", 404)
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
    throw createApiError("Not a valid certificate ID", 403)
  }

  //delete certificate by ID
  const cert = await User.updateOne(
    { userId: userId },
    { $pull: { records: { _id: certificateID } } },
    { safe: true }
  );

  if (!cert) {
    throw createApiError(`No Certificate with id ${certificateID}`, 404)
  }
  return res
    .status(200)
    .json(handleResponse({ message: `Certificate has been Deleted` }));
});

const verifyCertificate = handleAsync(async (req, res) => {
  const { id: certificateID } = req.params;

  if (!certificateID.match(/^[0-9a-fA-F]{24}$/)) {
    throw createApiError("Not a valid certificate ID", 403)
  }

  //delete certificate by ID
  const cert = await User.findOne(
    { _id: certificateID },
  );

  if (!cert) {
    throw createApiError(`Not a Valid Certificate`, 404)
  }
  return res
    .status(200)
    .json(handleResponse({ message: `Certificate Is Valid` }));

})

const getCertificateStatus = handleAsync(async (req, res) => {
  const userId = req.user._id;


  const user = await User.findOne({ userId });
  if (!user) throw createApiError("user not found", 404)

  const certificateId = req.params.id;
  const certificate = user.records.find(cert => cert._id !== certificateId);

  if (!certificate) {
    throw createApiError(`Certificate not found`, 404)
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
    )
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
    )
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
    throw createApiError(`No Certificate with id ${certificateId}`, 404)
  }

  return res.status(200).json(
    handleResponse({
      message: `Certificate ID ${certificateId} has been updated`
    })
  );
});

const updateCertificateStatus = handleAsync(async (req, res) => {
  const userId = req.user._id;
  const payload = req.body

  const user = await User.findOne({ userId });
  if (!user) throw createApiError("user not found", 404)

  const certificateId = req.params.id;
  const certificate = user.records.find(cert => certificateId == cert._id);

  if (!certificate) {
    throw createApiError(`Certificate not found`, 404)
  }

  const certificateStatus = payload.status.toLowerCase();

  const certifiCateStatusTest = ["pending", "issued", "canceled"].some(
    value => {
      return value === certificateStatus;
    }
  );

  if (!certifiCateStatusTest) {
    throw createApiError("invalid status", 400)
  }

  certificate.status = certificateStatus;
  await user.save();

  return res.status(200).json(
    handleResponse({
      message: `${certificate.name} status set to ${certificateStatus}`
    })
  );
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
  deleteUserCertificates
};
