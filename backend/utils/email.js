const {handleAsync, handleError,handleResponse,createApiError} = require("./helpers")
const nodemailer = require("nodemailer");
require("dotenv").config();
const hbs = require('nodemailer-express-handlebars')
const path = require('path')

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready for Message ");
    console.log(success);
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

//send Mailing email
const sendMailingEmail = ({ email }, res) => {
  //mail options
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: `${email}`,
    subject: `Certgo- You are on our Mailing List`,
    template: 'mailing',
    
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      res
      .status(200)
      .json(handleResponse({},"Confirmation Mail has been sent"));
      console.log("Email sent: " + info.response);
    }
  });
};

//send Application Email
const sendApplicationEmail = ({ email, name, role, location }, res) => {
  //mail options
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: `${email}`,
    subject: `Certgo- New Career Application`,
    template: 'career',
    context: {
      name: `${name}`,
      role : `${role}`,
      location : `${location}`
    }

  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      res
      .status(200)
      .json(handleResponse({},"Career Confirmation Mail has been sent"));
      console.log("Email sent: " + info.response);
    }
  });
};

const sendChangePasswordEmail = ({ email, link }, res) => {
  //mail options
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: `${email}`,
    subject: `Certgo- Change Password`,
    template: 'forgetpassword',
    context: {
      link 
    }
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      res
      .status(200)
      .json(handleResponse({},"Confirmation Mail has been sent"));
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = {
  sendMailingEmail,
  sendApplicationEmail,
  sendChangePasswordEmail,
};
