const { handleAsync, handleError, handleResponse, createApiError } = require("../utils/helpers")

const nodemailer = require('nodemailer')
const fs = require('fs');
const fsPromises = require('fs/promises');
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

async function sendCertificate(email, filePath) {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.AUTH_EMAIL,
            pass: process.env.AUTH_PASS,
        }

    })
    console.log(email);
    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: `${email}`,
        subject: `Certgo- Your Certificates are Ready`,
        html: `<p>Thank you for using Certgo online certificate generator.</p>

                <p>Your Certificate has been attached below</p>
                `,
        attachments: [
            {
                filename: "certificate" + ".pdf",
                contentType: "pdf",
                content: await fsPromises.readFile(filePath)
            }
        ]
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return error.message
        } else {
            console.log('Email sent: ' + info.response);
            return info.response
        }
    })
}

module.exports = {
    sendCertificate
}