const path = require("path");
const os = require("os");
const uuid = require("uuid").v4;
const AdmZip = require("adm-zip");
const PDFSIZE = { width: 1016, height: 720 };
const puppeteer = require("puppeteer");
const Handlebars = require("handlebars");
const csvToJson = require("csvtojson");
const { v4 } = require("uuid");
const { isValidJsonOutput } = require("../utils/validation");

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

// Generates image for one or more certificates
async function GenerateCertificateImages(data, template, logo) {
  // Launch puppeter browser
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disabled-setupid-sandbox"]
  });

  const hbs = Handlebars.compile(template);

  // Handle multiple certificates i.e array of certificates
  if (Array.isArray(data)) {
    const imagePaths = [];

    for (let certificate of data) {
      // Set logo
      certificate.logo = logo;

      // Generate image for the current certificate
      const imagePath = await GenerateCertificate(
        hbs,
        certificate,
        browser,
        FORMATTYPES.IMG
      );

      // Add path to list of paths
      imagePaths.push(imagePath);
    }

    await browser.close();
    return imagePaths;
  } else {
    // Set logo
    data.logo = logo;

    // Generate image for single certificate
    const imagePath = await GenerateCertificate(
      hbs,
      data,
      browser,
      FORMATTYPES.IMG
    );

    // Close browser
    await browser.close();
    return imagePath;
  }
}

async function GenerateCertificatePdfs(data, template, logo) {
  // Launch browser
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disabled-setupid-sandbox"]
  });

  const hbs = Handlebars.compile(template);

  // Handle multiple certificates i.e array of certificates
  if (Array.isArray(data)) {
    const pdfPaths = [];

    for (let certificate of data) {
      // Set logo
      certificate.logo = logo;

      // Generate pdf for the current certificate
      const pdfPath = await GenerateCertificate(hbs, certificate, browser);

      pdfPaths.push(pdfPath);
    }

    await browser.close();
    return pdfPaths;
  } else {
    // Set logo
    data.logo = logo;

    // Generate pdf for single certificate
    const pdfPath = await GenerateCertificate(hbs, data, browser);

    // Close browser
    await browser.close();
    return pdfPath;
  }
}

async function GenerateCertificate(hbs, certificate, browser, type) {
  const page = await browser.newPage();

  // Set page content to handlebars template
  await page.setContent(
    hbs(certificate, {
      allowProtoPropertiesByDefault: true
    })
  );

  // Generate temporary file path
  const filePath = path.resolve(
    os.tmpdir(),
    formatCertificateFileName(certificate.name, type || FORMATTYPES.PDF)
  );

  // Generate pdf or image based on the specified format type
  if (type == FORMATTYPES.IMG)
    await page.screenshot({ path: filePath, fullPage: true });
  else await page.pdf({ path: filePath, ...PDFSIZE });

  await page.close();

  return filePath;
}

const FORMATTYPES = {
  PDF: "pdf",
  IMG: "png"
};

const extractCertificatesFromReq = async (files, payload) => {
  const uuidv4 = v4();
  let certificates;

  if (files) {
    const csvFile = files.file.data;
    const csvData = Buffer.from(csvFile).toString();
    certificates = await csvToJson().fromString(csvData);

    if (!isValidJsonOutput(certificates)) {
      // throw createApiError("Invalid input from uploaded csv file", 400);
      return {
        certificates: "",
        error: "Invalid input from uploaded csv file",
        errorStatus: 400
      };
    }

    //append uuid and link to the certificate object
    certificates = certificates.map(data => {
      let id = v4();
      return {
        ...data,
        uuid: id,
        link: `https://certgo.hng.tech/single_preview?uuid=${id}`
      };
    });
  } else if (payload) {
    if (
      !payload.name ||
      !payload.nameoforganization ||
      !payload.award ||
      !payload.email ||
      !payload.description ||
      !payload.date ||
      !payload.signed
    )
      return { certificates: "", error: "Invalid payload", errorStatus: 400 };

    certificates = [
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
  } else return { certificates: "", error: "bad request", errorStatus: 400 };

  return { certificates, error: null, errorStatus: null };
};

module.exports = {
  handleZip,
  PDFSIZE,
  GenerateCertificateImages,
  GenerateCertificatePdfs,
  extractCertificatesFromReq
};
