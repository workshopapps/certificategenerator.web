const {
  handleAsync,
  handleResponse,
  createApiError
} = require("../utils/helpers");

require("dotenv").config();
const nodemailer = require("nodemailer");
const fs = require("fs/promises");

exports.emailNotification = handleAsync(async (req, res) => {
  const user = req.user;

  const email = user.email;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASS
    }
  });

  const data = await fs.readFile(req.files.file.tempFilePath);

  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: `${email}`,
    subject: `Certgo- Your Certificates are Ready`,
    html: `<p>Thank you for using Certgo online certificate generator.</p>

            <p>Your Certificate has been attached below</p>
            `,
    attachments: [
      {
        filename: req.files.file.name,
        content: data
      }
    ]
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);

      throw createApiError(error.message, 422);
    } else {
      res
        .status(200)
        .json(
          handleResponse(
            {},
            "Notification for Certificate has been sent to Email"
          )
        );
      console.log("Email sent: " + info.response);
    }
  });
});
