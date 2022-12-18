const path = require("path");
const nodeToImage = require("node-html-to-image");
const os = require("os");
const fs = require("fs");
const { createApiError } = require("./helpers");
const { getTemplate } = require("./templates");
const uuid = require("uuid").v4;
const AdmZip = require("adm-zip");
const imageToPdf = require("image-to-pdf");
const PDFSIZE = [931, 600];
const voca = require("voca");

async function convertCertificates(certificates = [], templateId) {
  const promises = certificates.map(async certificate => {
    const imgPath = await convertCertificate(certificate, templateId);
    return imgPath;
  });

  const imgPaths = await Promise.all(promises);

  return imgPaths;
}

async function convertCertificate(certificate = {}, templateId = 1) {
  const template = getTemplate(templateId);

  const imgPath = path.resolve(
    os.tmpdir(),
    formatCertificateFileName(certificate.name)
  );

  await nodeToImage({
    html: template,
    output: imgPath,
    content: {
      name: voca.titleCase(certificate.name),
      award: voca.titleCase(certificate.award),
      issuedBy: certificate.signed,
      issueDate: certificate.date,
      description: certificate.description,
      nameoforganization: "Zuri"
    },
    puppeteerArgs: {
      headless: true,
      args: ["--no-sandbox", "--disabled-setupid-sandbox"]
    }
  });

  return imgPath;
}

function handleZip(filePaths = []) {
  var zip = new AdmZip();

  // Add each image to the zip
  filePaths.forEach((filePath, i) => {
    // Format the name of each file in zip
    const filename = filePath.split(path.sep).pop().slice(36);
    zip.addLocalFile(filePath, undefined, `${i}-${filename}`);
  });

  // Convert the zip to a buffer
  return zip.toBuffer();
}

function formatCertificateFileName(
  name = "certificate",
  type = FORMATTYPES.IMG
) {
  // Replace spaces with hypen e.g Awe Ayo = Awe-Ayo
  let formattedName = name.replaceAll(".", " ").trim().replaceAll(" ", "-");

  return `${uuid()}${formattedName}.${type}`;
}

async function handleSplitPdf(imagePaths = [], size = PDFSIZE) {
  const pdfPromises = imagePaths.map(image => {
    return new Promise((resolve, reject) => {
      // Create path for pdf
      const pdfPath = path.resolve(
        os.tmpdir(),
        formatCertificateFileName(getNameFromImgPath(image), FORMATTYPES.PDF)
      );

      // convert image to pdf
      imageToPdf([image], PDFSIZE).pipe(
        fs
          .createWriteStream(pdfPath)
          .on("finish", () => resolve(pdfPath))
          .on("error", error => reject(error))
      );
    });
  });

  const pdfPaths = await Promise.all(pdfPromises);

  return pdfPaths;
}

const FORMATTYPES = {
  PDF: "pdf",
  IMG: "png"
};

function getNameFromImgPath(imgPath) {
  if (!imgPath) throw createApiError("Something went wrong", 422);

  // Get name of certificate holder from image url e.g john-champ
  // from 'C:\Users\HPENVY\AppData\Local\Temp\83494492-02f3-4c45-be4b-5e992455f5c6john-champ.png
  return imgPath.split(path.sep).pop().slice(36).split(".")[0];
}

module.exports = {
  convertCertificates,
  handleZip,
  handleSplitPdf,
  convertCertificate,
  PDFSIZE
};
