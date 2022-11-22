const Contact = require('../models/contactModel.js');
const dotenv = require('dotenv');
dotenv.config();
// const config = require('../utils/config.js')
const nodemailer = require('nodemailer');

// get all contacts
const getContacts = async (req,res) => {
  try{
    const contacts = await Contact.find();
    res.status(200).json({
      message: "All Contacts",
      contacts: contacts,
    });
  } catch (err) {
    console.log({message: err.message});
    res.status(500);
  }
}

// send Email to contact from form
const sendContact =  async (req, res) => {
  try{
    const {firstName, lastName, email, phoneNumber, message} = await req.body;
    const newContact = new Contact({
      firstName,
      lastName,
      email,
      phoneNumber,
      message
    });

    newContact.save();

    const mail = `
    <p>Your message has been received.</p>
  `
    // Create Transporter
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS
        // clientId: GOOGLE_CLIENT_ID,
        // clientSecret: GOOGLE_CLIENT_SECRET
        // refreshToken: GOOGLE_REFRESH_TOKEN
      }
    });

    // Mail Options To Website User
    let mailOptions = {
      from: `${process.env.AUTH_EMAIL}`, //Sender address
      to: `${req.body.email}`, // Receiver address
      subject: 'Hi From Certawi',
      text: 'Hi from Certawi',
      html: mail
    };

    transporter.sendMail(mailOptions, function(err, data) {
      if (err) {
        console.log("Error: " + err);
      } else {
        console.log("Email sent successfully");
        console.log(data);
      }
    });

    res.status(201).json({
      message: "Message sent",
      newContact
    })
  } catch (err) {
    console.log({message: err.message});
    res.status(500);
  }
}

module.exports = {
  getContacts,
  sendContact
}