const nodemailer = require('nodemailer')
fs = require('fs');
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.emailNotification = async (req, res) => {
    const { file } = req.files;
    const auth = req.headers.authorization;

    if (!auth) {
        return res.status(403).json({ error: "No credentials sent!" });
    }

    const token = auth.split(" ")[1];
    const { userId } = jwt.decode(token);
    const user = await User.findById(userId).exec();
    if (!user) return res.status(404).json({ message: "user not found" });

    const email = user.email;
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.AUTH_EMAIL,
            pass: process.env.AUTH_PASS,

        }
    })
    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: `${email}`,
        subject: `Certgo- Your Certificates are Ready`,
        html: `<p>Thank you for using Certgo online certificate generator.</p>

                <p>Your Certificate has been attached below</p>
                `,
        attachments: [{
            filename: file.name,
            content: fs.createReadStream(file.tempFilePath)
        }]

    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            res.status(200).json({ message: "Notification for Certificate has been sent to Email" })
            console.log('Email sent: ' + info.response);
            
            // fs.unlink(`tmp/${file.name}`, function (err) {
            //     if (err) return console.log(err);
            //     console.log('file deleted successfully and notification has been sent');
            // })
        }
    })

}
