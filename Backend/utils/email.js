const nodemailer = require('nodemailer')
require('dotenv').config();

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,

    }
})

transporter.verify((error,success)=>{
    if(error){
        console.log(error);
    }else{
        console.log("Ready for Massage ");
        console.log(success);
    }

})


    //send Mailing email
const sendMailingEmail = ({email}, res) => {

            //mail options
            const mailOptions = {
            from: config.AUTH_EMAIL,
            to: `${email}`,
            subject: `Certawi- You are on our Mailing List`,
            html: `<p>Thank you for joining Certawi.</p>
            <p>You will recieve other important Updates from us.</p>
            `,
            } 

            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                    res.status(200).json({message:"Confirmation Email has been sent"})
                  console.log('Email sent: ' + info.response);
                }
              })
              
    }

module.exports ={
    sendMailingEmail
}