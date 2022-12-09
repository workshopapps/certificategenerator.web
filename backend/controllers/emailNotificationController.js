const {handleAsync, handleError,handleResponse,createApiError} = require("../utils/helpers")

const nodemailer = require('nodemailer')
fs = require('fs');
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.emailNotification = async (req, res) => {
    const auth = req.headers.authorization;

    if (!auth) throw createApiError("No credentials sent!", 403);

    const token = auth.split(" ")[1];
    const { userId } = jwt.decode(token);
    const user = await User.findById(userId).exec();
    if (!user) throw createApiError("user not found!", 404);

    const email = user.email;
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
            filename: "certificate" + ".jpg",
            contentType: "image/jpeg",
            content: new Buffer.from(req.body.file.split("base64,")[1], "base64")
        }
    ]
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            res
            .status(200)
            .json(handleResponse({},"Notification for Certificate has been sent to Email"));
            console.log('Email sent: ' + info.response);
     
        }
    })
}
