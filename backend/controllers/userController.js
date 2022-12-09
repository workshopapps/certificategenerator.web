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


exports.uploadUserBrandKit = async (req, res) => {
    const { file } = req.files;
    
    const auth = req.headers.authorization;
    
    if (!auth) {
      return res.status(403).send({ error: "No credentials sent!" });
    }
    const token = auth.split(" ")[1];
    const { userId } = jwt.decode(token);
    const user = await User.findOne({ _id: userId})
    try {
        if (user.subscription === "premium") {
            const result = await cloudinary.uploader.upload(file.tempFilePath)
            if (result) {
             user.avatar = result.secure_url
            }
            user.save()
<<<<<<< HEAD
          return res.status(200).send({ brandkit: user.avatar, message: `Brand Kit Successfully Updated` }) 
=======
          return res.status(200).send({ brandkit: user.avatar, message: 'Brand Kit Successfully Updated' }) 
>>>>>>> 29577282fd6fd9b08f2895d7860b5ee98ce47321
        } else {
            return res.status(422).send({ message: `Unable to process your request`})
        }
        
    } catch (err) {
    
        return res.status(422).send({ message: `Unable to process your request`})
    }
    
}

exports.getUserBrandKit = async (req, res) => {
    let brandkit
    const auth = req.headers.authorization;
    if (!auth) {
        return res.status(403).send({ error: "No credentials sent!" });
    }

    const token = auth.split(" ")[1];
    
    const { userId } = jwt.decode(token);
    
    const user = await User.findOne({ _id: userId })
     console.log(user.avatar)
    if (user.subscription !== "premium") {
        return res.status(422).send(`You have to a premium user`)
    }
    brandkit = user.avatar
    return res.status(200).send({ brandkit })
}    
