require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const sgClient = require('@sendgrid/client');
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,

    }
})



sgMail.setApiKey(process.env.SENDGRID_API_KEY);
sgClient.setApiKey(process.env.SENDGRID_API_KEY);



async function addContact(email) {
    try {  
        const data = {
            "contacts": [{
                "email": email
            }]
        };
        const request = {
            url: `/v3/marketing/contacts`,
            method: 'PUT',
            body: data
          }
        return sgClient.request(request);
    } catch (error) {
        throw error
    }

}


exports.subscribe = async (req, res, next) => {
    try {
        await addContact(req.body.email);
        res.status(201).json({ message: "You have successfully subscribed to our newsletter" });
        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: `${req.body.email}`,
            subject: `Thank you for subscribing to our newsletter`,
            html: `Hello ${req.body.email},<br>Thank you for subscribing to our newsletter.<br>You will recieve other important Updates from us.`,
        }
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log('could not send email');
            } else {
                console.log("email sent!")
            }
        })
    } catch (err) {
        console.log(err)
        if (!err.statusCode) {
            err.statusCode = 500
          }
          return res.status(err.statusCode).json(err);  
    }
}
