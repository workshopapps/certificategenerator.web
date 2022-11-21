const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const { validationResult } = require("express-validator")
const config = require("../utils/config")


const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(config.GOOGLE_CLIENT_ID);


//function to verify user google access token
async function verify(_token) {
    try {  
        const ticket = await client.verifyIdToken({
            idToken: _token,
            audience: config.GOOGLE_CLIENT_ID,
        });
        return ticket.getPayload();
    } catch (error) {
        throw error
    }
}

//function to check if user already exists
const userExist = async (_email) => {
    const user = await User.findOne({ email: _email })
    if (user) {
        return true
    }
    return false
}


const userSignup = async (req, res, next) => {
    try {
        let { accessToken, email, password } = req.body;

        //google signup
        if (req.body.accessToken) {
            const payload = await verify(accessToken)
            const googleUserId = payload["sub"];
            email = payload["email"];

            //check db if user already exists
            if (await userExist(email)) {
                return res.status(401).json({ message: "email already in use" })
            }

            //if not create new user
            const newUser = new User({
                email: email,
                authenticationType: {
                    google: {
                        uuid: googleUserId
                    }
                }
            })
            const createdUser = await newUser.save()
            return res.status(201).json({message: "New User has been created.", id: createdUser._id, email: createdUser.email})
        }

        //Form signup
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("validation failed");
            error.statusCode = 422;
            error.data = errors.array()
            throw error;
        }

        if (await userExist(email)) {
            return res.status(401).json({ message: "email already in use" })
        }

        bcrypt.hash(password, 10, async function (err, hash) {
            if (err) {
                const error = new Error("account could not be created");
                error.statusCode = 422;
                throw error;
            }
            const newUser = new User({
                email: email,
                authenticationType: {
                    form: {
                        password: hash
                    }
                }
            })
            const createdUser = await newUser.save()
            res.status(201).json({message: "New User has been created.", id: createdUser._id, email: createdUser.email})
        });
    } catch (err) {
        next(err)
    }
}


module.exports = {
    userSignup
}
