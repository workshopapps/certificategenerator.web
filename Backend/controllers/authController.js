const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const config = require("../utils/config");

const { OAuth2Client } = require("google-auth-library");
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
    throw error;
  }
}

//function to check if user already exists
const userExist = async (_email) => {
  const user = await User.findOne({ email: _email });
  if (user) {
    return true;
  }
  return false;
};

const userSignup = async (req, res, next) => {
  try {
    let { accessToken, email, password } = req.body;
    console.log('password', password)

    //google signup
    if (req.body.accessToken) {
      const payload = await verify(accessToken);
      const googleUserId = payload["sub"];
      email = payload["email"];

      //check db if user already exists
      if (await userExist(email)) {
        return res.status(401).json({ message: "email already in use" });
      }

      //if not create new user
      const newUser = new User({
        email: email,
        authenticationType: {
          google: {
            uuid: googleUserId,
          },
        },
      });
      const createdUser = await newUser.save();
      return res.status(201).json({
        message: "New User has been created.",
        id: createdUser._id,
        email: createdUser.email,
      });
    }

    //Form signup
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("validation failed");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    if (await userExist(email)) {
      return res.status(401).json({ message: "email already in use" });
    }

    bcrypt.hash(password, 10, async function (err, hash) {
      if (err) {
        const error = new Error("account could not be created");
        error.statusCode = 422;
        throw error;
      }
      const newUser = new User({
        email: email,
        password: hash,  //mistake?
        authenticationType: {  //what is this line for? i dont think we need it
          form: {
            password: hash,
          },
        },
      });
      const createdUser = await newUser.save();
      res.status(201).json({
        message: "New User has been created.",
        id: createdUser._id,
        email: createdUser.email,
      });
    });
  } catch (err) {
    next(err);
  }
};

const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json("Please provide email and password");
    }

    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("A user for this email could not be found!");
      error.statusCode = 401;
      throw error;
    }
    const isEqual = bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("Wrong password!");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.status(201).json({
      message: "user logged in successfully",
      token: token,
      userId: user._id.toString(),
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User does not exist" });
  }

  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  if (!token) {
    return res.status(401).json({ message: "token cannot be verified" });
  }
  res.status(200).json({ newpasswordToken: token });
};

const changePassword = async (req, res) => {
  try {
    const { token } = req.params;

    if (!token) {
      return res.status(400).json({ message: "token is required" });
    }
    const { newpassword, confirmpassword } = req.body;
    if (newpassword != confirmpassword) {
      return res
        .status(400)
        .json({ message: "both passwords are not the same" });
    }
    const { email } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email });
    user.password = newpassword;
    user.save();
    res.status(200).send({ message: "password changed" });
  } catch (error) {
    return res.status(401).json({ message: "invalid Token" });
  }
};

module.exports = {
  userSignup,
  userLogin,
  forgotPassword,
  changePassword,
};
