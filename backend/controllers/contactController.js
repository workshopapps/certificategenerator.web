const Contact = require('../models/contactModel.js');
const dotenv = require('dotenv');
dotenv.config();
// const config = require('../utils/config.js')
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars')
const path = require('path')


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

 
    // Create Transporter
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS
      }
    });

    const handlebarOptions = {
      viewEngine:{
        defaultLayout: false,
        extName: '.handlebars',
        partialsDir: path.resolve(__dirname, '..', 'email-templates')
      },
      viewPath: path.resolve(__dirname, '..', 'email-templates'),
      extName: '.handlebars'
    }
    
    transporter.use('compile', hbs(handlebarOptions))

    // Mail Options To Website User
    let mailOptions = {
      from: `${process.env.AUTH_EMAIL}`, //Sender address
      to: `${req.body.email}`, // Receiver address
      subject: 'Hi From Certgo',
      text: 'Hi from Certgo',
      template: 'contact',
        context: {
          contactName: `${req.body.firstName}`+' ' +`${req.body.lastName}` 
        }   
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