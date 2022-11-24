const nodemailer = require('nodemailer')
fs = require('fs');
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");


//for development
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;


exports.sendCertificate = async (req, res) => {
    const auth = req.headers.authorization;
    const file = req.file;

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
        subject: `Certonic Certificate`,
        html: `<p>Thank you for using Certonic.</p>
                <p>Here is your Certificate</p>
                `,
        attachments: [{
            filename: 'Certificate.pdf',
            content: fs.createReadStream(file.path)
        }]

    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            res.status(200).json({ message: "Certificate has been sent to Email" })
            console.log('Email sent: ' + info.response);
            fs.unlink(`uploads/${file.filename}`, function (err) {
                if (err) return console.log(err);
                console.log('file deleted successfully');
            })
        }
    })

}
