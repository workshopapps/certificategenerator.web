const path = require("path");
const nodeToImage = require("node-html-to-image");
const fs = require("fs");
const os = require("os");
const { createApiError } = require("./helpers");
const uuid = require("uuid").v4;

async function convertCertificates(certificates = []) {
  const promises = certificates.map(async certificate => {
    const imgPath = await convertCertificate(certificate);
    return imgPath;
  });

  const imgPaths = await Promise.all(promises);

  return imgPaths;
}

async function convertCertificate(certificate = {}) {
  const template = `<html>
	<head>
		<style type='text/css'>
			body, html {
				margin: 0;
				padding: 0;
			}
			body {
				color: black;
				display: table;
				font-family: Georgia, serif;
				font-size: 24px;
				text-align: center;
				width: 1180px;
				height: 760px;
			}
			.container {
				border: 20px solid tan;
				width: 750px;
				height: 563px;
				display: table-cell;
				vertical-align: middle;
			}
			.logo {
				color: tan;
			}

			.marquee {
				color: tan;
				font-size: 48px;
				margin: 20px;
			}
			.assignment {
				margin: 20px;
			}
			.person {
				border-bottom: 2px solid black;
				font-size: 32px;
				font-style: italic;
				margin: 20px auto;
				width: 400px;
			}
			.reason {
				margin: 20px;
			}
		</style>
	</head>
	<body>
		<div class="container">
			<div class="logo">
				{{nameoforganization}}
			</div>

			<div class="marquee">
				Certificate of Completion
			</div>

			<div class="assignment">
				This certificate is presented to
			</div>

			<div class="person">
				{{name}}
			</div>

			<div class="reason">
				{{award}}
			</div>
		</div>
	</body>
  </html>`;

  const imgPath = path.resolve(os.tmpdir(), uuid() + ".png");

  await nodeToImage({
    html: template,
    output: imgPath,
    content: {
      name: certificate.name,
      award: certificate.award,
      nameoforganization: "Zuri"
    }
  });

  return imgPath;
}

module.exports = { convertCertificates };
