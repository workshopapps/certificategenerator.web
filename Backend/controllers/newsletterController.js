require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const sgClient = require('@sendgrid/client');




sgMail.setApiKey(process.env.SENDGRID_API_KEY);
sgClient.setApiKey(process.env.SENDGRID_API_KEY);



async function addContact(email) {
    const data = {
        "contacts": [{
            "email": email
        }]
    };
    console.log(data)
    const request = {
        url: `/v3/marketing/contacts`,
        method: 'PUT',
        body: data
      }
    return sgClient.request(request);

}


exports.subscribe = async(req, res, next) => {
    const email = req.body.email;
    const msg = {
        to: req.body.email,
        from: 'adebobolamuhydeen@gmail.com',
        subject: `Thank you for subscribing to our newsletter`,
        html: `Hello ${req.body.email},<br>Thank you for subscribing to our newsletter.`
    }
    await addContact(req.body.email);
    await sgMail.send(msg);
    res.status(201).json({ message: "You have successfully subscribed to our newsletter" });
}

// exports.sendNewsletter = (req, res, next) => {
    
// }