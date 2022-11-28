const nodemailer = require('nodemailer')
require('dotenv').config();

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,

    }
})

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Ready for Message ");
        console.log(success);
    }

})


//send Mailing email
const sendMailingEmail = ({ email }, res) => {

    //mail options
    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: `${email}`,
        subject: `Certgo - You are on our Mailing List`,
        html: `<p>Thank you for joining Certgo.</p>
            <p>You will recieve other important Updates from us.</p>
            `,
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            res.status(200).json({ message: "Confirmation Email has been sent" })
            console.log('Email sent: ' + info.response);
        }
    })

}

//send Application Email 
const sendApplicationEmail = ({ email, name,role,location }, res) => {

    //mail options
    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: `${email}`,
        subject: `Certgo- New Career Application`,
        html: `<p>Dear ${name},</p>
            <p>You have applied for the role of ${role} and your location is ${location}.</p>
            <p>Expect update concerning your application from us,</p>
            <p> From the "Certgo Career Team" </p>
            `,
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            res.status(200).json({ message: "Career Confirmation Email has been sent" })
            console.log('Email sent: ' + info.response);
        }
    })

}

module.exports = {
    sendMailingEmail , sendApplicationEmail
}