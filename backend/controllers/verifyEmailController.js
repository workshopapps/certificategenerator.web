const User = require("../models/userModel");
const dotenv = require('dotenv');
dotenv.config();
const crypto = require('crypto')
const nodemailer = require('nodemailer');

let code = crypto.randomBytes(10).toString('hex');

const sendVerEmail =  async (req, res) => {
  try{
    
    let link="http://"+req.get('host')+"/api/verifyEmail/verify?id="+code;
    const mail = `
    Hello,
    Please Click on the link to verify your email.
    <p> ${link} Click here to verify <p>
  `
    // Create Transporter
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS
      }
    });

    // Mail Options To Website User
    let mailOptions = {
      from: `${process.env.AUTH_EMAIL}`, //Sender address
      to: `${req.body.email}`, // Receiver address
      subject: 'Please confirm your Email account',
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
      message: "Message sent"
    })
  } catch (err) {
    console.log({message: err.message});
    res.status(500);
  }
}


const verify = async(req,res) => {
  try {
    let host = req.get('host');
    console.log(req.protocol+":/"+req.get('host'));
    if((req.protocol+"://"+req.get('host'))==("http://"+host)) {
      console.log("Domain is matched. Information is from Authentic email");
        if(req.query.id==code) {
          console.log("email is verified");
          res.send("Email has been Successfully verified");
          res.redirect('')
        } else {
          console.log("email is not verified");
          res.send("Bad Request");
        }
    } else {
      res.end("Request is from unknown source");
    }
  } catch(err) {
    console.log({message: err.message});
    res.status(500);
  }
}

module.exports = {
  verify,
  sendVerEmail
}