const Template = require("../models/templateModel")
const User = require("../models/userModel")
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");
require('dotenv').config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


exports.createTemplate = async (req, res) => {
    let template
    const auth = req.headers.authorization;
    if (!auth) {
      return res.status(403).send({ error: "No credentials sent!" });
    }
    const token = auth.split(" ")[1];
    const { userId } = jwt.decode(token);
    const user = await User.findOne({ _id: userId })
    try {
        if (user.subscription === "premium") {
            const result = await cloudinary.uploader.upload(req.file.path)
            if (result) {
                template = await Template.create({
                    publicId: result.public_id,
                    secureUrl: result.secure_url,
                    userId: userId
                })
            }
        }
        return res.status(201).send({ template, message: `New Template Created` })
    } catch (err) {
        return res.status(422).send({ message: `Unable to process your request`})
    }
    
}
