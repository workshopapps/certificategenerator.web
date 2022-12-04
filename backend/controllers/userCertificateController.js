const User = require("../models/certificateModel");
const jwt = require("jsonwebtoken");
const csvToJson = require("csvtojson");
const { v4 } = require("uuid");
const { isValidJsonOutput } = require("../utils/validation");
const { deleteMany } = require("../models/certificateModel");

const addCertificate = async (req, res) => {
  const auth = req.headers.authorization;
  const uuidv4 = v4();


  if (!auth) {
    return res.status(403).json({ error: "No credentials sent!" });
  }

  const token = auth.split(" ")[1];
  const { userId } = jwt.decode(token);

  const files = req.files;
  const payload = req.body;

  if (!files && Object.keys(payload).length === 0) {
    return res.status(400).json({ message: "bad request" }).end();
  }

  let certificateData;
  if (files) {
    const csvFile = files.file.data;
    const csvData = Buffer.from(csvFile).toString();
    certificateData = await csvToJson().fromString(csvData);

   

    if (!isValidJsonOutput(certificateData)) {
      return res
        .status(400)
        .json({ message: "Invalid input from uploaded csv file" })
        .end();
    }

     //append uuid and link to the certificate object
     certificateData = certificateData.map((data) => {
      let id = v4();

      return {
        ...data,
        uuid: id,
        link: `https://certgo.hng.tech/single_preview?uuid=${id}`
      }
    })
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
      },
    ];
  } else return res.status(400).json({ message: "bad request" }).end();

  const user = await User.findOne({ userId }).exec();

  if (!user) {
    await User.create({
      userId: userId,
      records: [...certificateData],
    });
  } else {
    user.records = [...user.records, ...certificateData];
    await user.save();
  }

  res.status(201).json({message: 'user certificate generated', data: certificateData });
};

const deleteUserCertificates = async(req, res) => {
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(403).json({ error: "No credentials sent!" });
  }

  const token = auth.split(" ")[1];
  const { userId } = jwt.decode(token);
  const user = await User.findOne({ userId }).exec();
  if (!user) return res.status(404).json({ message: "user not found" });

  await User.deleteMany({ userId })
  res.status(204)
}

const getAllCertificates = async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(403).json({ error: "No credentials sent!" });
  }

  const token = auth.split(" ")[1];
  const { userId } = jwt.decode(token);
  const user = await User.findOne({ userId }).exec();
  if (!user) return res.status(404).json({ message: "user not found" });

  const certificates = user.records;

  res.status(200).json(certificates);
};

//This is for getting one certificate
const getCertificate = async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(403).json({ error: "No credentials sent!" });
  }

  const token = auth.split(" ")[1];
  const { userId } = jwt.decode(token);

  const user = await User.findOne({ userId });
  if (!user) return res.status(404).json({ message: "user not found" });

  const certificateId = req.params.id;
  const certificate = user.records.find((cert) => certificateId == cert._id);

  if (!certificate) {
    return res.status(404).json({ message: `Certificate not found` });
  }

  return res.status(200).json(certificate);
};

const getNoOfCertificatesIssued = async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(403).json({ error: "No credentials sent!" });
  }

  const token = auth.split(" ")[1];
  const { userId } = jwt.decode(token);
  const user = await User.findOne({ userId }).exec();
  const certificates = user.records;

  res
    .status(200)
    .json({ issuedCertificates: certificates.length });
};

const deleteCertificate = async (req, res) => {
  const {id:certificateID} = req.params


  //validate header authorization
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(403).json({ message: 'No auth credentials sent!'});
  }

  const token = auth.split(" ")[1];
  const { userId } = jwt.decode(token);

   //validate param ID
   if (!certificateID.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(403).json({ message: 'Not a valid certificate ID'});
  }

  //delete certificate by ID
  const cert = await User.updateOne({ userId: userId}, { $pull: { records: { _id: certificateID } } }, { safe: true })
  
  if(!cert){
      return res.status(404).json({message: `No Certificate with id ${certificateID}`})
  }
  return res.status(200).json({message: `Certificate has been Deleted`})
}

const getCertificateStatus = async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(403).json({ error: "No credentials sent!" });
  }

  const token = auth.split(" ")[1];
  const { userId } = jwt.decode(token);

  const user = await User.findOne({ userId });
  if (!user) return res.status(404).json({ message: "user not found" });

  const certificateId = req.params.id;
  const certificate = user.records.find((cert) => cert._id !== certificateId);

  if (!certificate) {
    return res.status(404).json({ message: `Certificate not found` });
  }

  const certificateStatus = certificate.status

  return res.status(200).json({status: certificateStatus});
}

const updateCertificateDetails = async (req, res) => {
  const {id:certificateId} = req.params;
  const { name, nameOfOrganization, award, description, date, signed, email } = req.body;
  const auth = req.headers.authorization;
  
  if (!auth) {
    return res.status(403).json({ error: 'No auth credentials sent!' });
  }

  const token = auth.split(" ")[1];
  const { userId } = jwt.decode(token);


  //validate and check certificateId is provided
   if (!certificateId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(403).json({ message: 'Please provide a valid certificateId as path parameter'});
  }


  //validate certificate data to be updated
  if(name == undefined 
    || nameOfOrganization == undefined 
    || award == undefined 
    || description == undefined 
    || date == undefined 
    || signed == undefined
    || email == undefined) {
      return res.status(400).json({ error: 'Please enter valid certificate details: name, nameOfOrganization, award, description, date, signed, email' });
  }


  //update mongodb
  const cert = await User.updateOne({ userId: userId, 'records._id' : certificateId }, {
    $set: {
      'records.$.name' : name,
      'records.$.nameoforganization' : nameOfOrganization,
      'records.$.award' : award, 
      'records.$.description' : description, 
      'records.$.date' : date, 
      'records.$.signed' : signed,
      'records.$.email' : email
    }
  })

  
  if(!cert){
    return res.status(404).json({message: `No Certificate with id ${certificateId}`})
  }

  return res.status(200).json({message: `Certificate ID ${certificateId} has been updated`})
}

const updateCertificateStatus = async (req, res) => {
  const auth = req.headers.authorization;
  const payload = req.body;

  if (!auth) {
    return res.status(403).json({ error: "No credentials sent!" });
  }

  const token = auth.split(" ")[1];
  const { userId } = jwt.decode(token);

  const user = await User.findOne({ userId });
  if (!user) return res.status(404).json({ message: "user not found" });

  const certificateId = req.params.id;
  const certificate = user.records.find((cert) => certificateId == cert._id);

  if (!certificate) {
    return res.status(404).json({ message: `Certificate not found` });
  }

  const certificateStatus = payload.status.toLowerCase();

  const certifiCateStatusTest = ['pending', 'issued', 'canceled'].some((value) => {
    return value === certificateStatus
  })

  if (!certifiCateStatusTest) {
    return res.status(400).json({message: 'invalid status'})
  }

  certificate.status = certificateStatus
  await user.save();

  return res.status(200).json({message: `${certificate.name} status set to ${certificateStatus}`})
}

module.exports = {
  getAllCertificates,
  addCertificate,
  getCertificate,
  getNoOfCertificatesIssued,
  deleteCertificate,
  getCertificateStatus,
  updateCertificateDetails,
  updateCertificateStatus,
  deleteUserCertificates
};
