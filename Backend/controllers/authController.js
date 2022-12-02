const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const config = require("../utils/config");
const UserToken = require("../models/UserToken");
const { generateTokens } = require("../utils/generateToken");
const { sendChangePasswordEmail } = require("../utils/email");

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
    let { accessToken, email, password, subscriptionPlan } = req.body;

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
        subscription: subscriptionPlan,
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
      return res
        .status(error.statusCode)
        .json({ message: "user validation failed", error: error });
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
        authenticationType: {
          form: {
            password: hash,
          },
        },
        subscription: subscriptionPlan,
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
    if (req.body.accessToken) {
      try {
        const payload = await verify(req.body.accessToken);
        const googleUserId = payload["sub"];
        email = payload["email"];
        const user = await User.findOne({ email });
        if (!user) {
          return res
            .status(401)
            .json({ message: "A user for this email could not be found!" });
        }
        if (googleUserId !== user.authenticationType.google.uuid) {
          return res.status(401).json({
            message:
              "google login hasn't been linked to this email, please login with the form",
          });
        }
        const { accessToken, refreshToken } = await generateTokens(user);

        return res.status(200).json({
          message: "user logged in successfully",
          token: accessToken,
          refreshToken: refreshToken,
          userId: user._id.toString(),
          subscription: user.subscription,
        });
      } catch (error) {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        return res
          .status(200)
          .json({ message: "could not verify accessToken" });
      }
    }

    if (!email || !password) {
      return res.status(400).json("Please provide email and password");
    }

    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("A user for this email could not be found!");
      error.statusCode = 401;
      throw error;
    }
    const isEqual = await await bcrypt.compare(
      password,
      user.authenticationType.form.password
    );
    if (!isEqual) {
      const error = new Error("Wrong password!");
      error.statusCode = 401;
      throw error;
    }
    const { accessToken, refreshToken } = await generateTokens(user);

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    return res.status(201).json({
      message: "user logged in successfully",
      token: accessToken,
      refreshToken: refreshToken,
      userId: user._id.toString(),
      subscription: user.subscription,
    });
  } catch (err) {
    next(err);
  }
};

const userLogout = async (req, res) => {
  try {
    const userToken = await UserToken.findOne({ token: req.body.refreshToken });
    if (!userToken)
      return res
        .status(200)
        .json({ error: false, message: "Logged Out Sucessfully" });

    await userToken.remove();
    res.status(200).json({ error: false, message: "Logged Out Sucessfully" });
  } catch (error) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User does not exist" });
  }
  const token = crypto.randomBytes(10).toString("hex");

  const link = `${process.env.BASE_URL}/changepassword/${user._id}/${token}`;

  await sendChangePasswordEmail({ email, link });

  res
    .status(200)
    .json({ message: "password reset link sent to your email account" });
};

const changePassword = async (req, res) => {
  try {
    const token = req.params.token;
    if (!token) {
      return res.status(400).json({ message: "token is required" });
    } else {
      const { newpassword, confirmpassword } = req.body;
      if (newpassword != confirmpassword) {
        return res
          .status(400)
          .json({ message: "both passwords are not the same" });
      }
      const user = await User.findById(req.params.userId);
      user.password = newpassword;
      user.save();
      res.status(200).send({ message: "password changed" });
    }
  } catch (error) {
    return res.status(401).json({ message: "invalid Token" });
  }
};

module.exports = {
  userSignup,
  userLogin,
  userLogout,
  forgotPassword,
  changePassword,
};
