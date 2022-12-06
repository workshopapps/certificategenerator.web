const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const config = require("../utils/config");
const UserToken = require("../models/UserToken");
const { generateTokens } = require("../utils/generateToken");
const { sendChangePasswordEmail } = require("../utils/email");
const { verifyRefreshToken } = require("../middleware/verifyRefreshToken")

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client("52168821352-4sc11trj4qtq95051mrnrbinfgmla3ai.apps.googleusercontent.com");

//function to verify user google access token
async function verify(_token) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: _token,
      audience: "52168821352-4sc11trj4qtq95051mrnrbinfgmla3ai.apps.googleusercontent.com",
    });
    return ticket.getPayload();
  } catch (error) {
    error = new Error("could not verify access token")
    error.statusCode = 401
    throw err
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
    try {
      
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
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 500
      }
      return res.status(error.statusCode).json({ message: "could not signup using google", error: error });
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
        return res.status(401).json({ message: "account could not be created" });
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
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    return res.status(error.statusCode).json({ message: "could not signup user", error: error });
  }
};

// const userLogin = async (req, res, next) => {
//   const { email, password } = req.body;
//   try {
//     if (req.body.accessToken) {
//       try {
//         const payload = await verify(req.body.accessToken);
//         const googleUserId = payload["sub"];
//         email = payload["email"];
//         const user = await User.findOne({ email });
//         if (!user) {
//           return res
//             .status(401)
//             .json({ message: "A user for this email could not be found!" });
//         }
//         if (googleUserId !== user.authenticationType.google.uuid) {
//           return res.status(401).json({
//             message:
//               "google login hasn't been linked to this email, please login with the form",
//           });
//         }
//         const token = jwt.sign(
//           {
//             userId: user._id,
//           },
//           process.env.JWT_SECRET,
//           { expiresIn: "24h" }
//         );
//         res.status(201).json({
//           message: "user logged in successfully",
//           token: token,
//           userId: user._id.toString(),
//           subscription: user.subscription
//         });
//       } catch (error) {
//         return res
//           .status(401)
//           .json({ message: "could not verify accessToken" });
//       }
//     }
//     if (!email || !password) {
//       return res.status(400).json("Please provide email and password");
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json("A user for this email could not be found!");
//     }
//     const isEqual = await bcrypt.compare(
//       password,
//       user.authenticationType.form.password
//     );
//     if (!isEqual) {
//       return res.status(401).json("Wrong password!");

//     }

//     const token = jwt.sign(
//       {
//         userId: user._id,
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: "24h" }
//     );
//     res.status(201).json({
//       message: "user logged in successfully",
//       token: token,
//       userId: user._id.toString(),
//       subscription: user.subscription
//     });
//   } catch (err) {
//     if (!err.statusCode) {
//         err.statusCode = 500
//     }
//     return res.status(err.statusCode).json(err);
//   }
// };

const userLogin = async (req, res, next) => {
  var { email, password } = req.body;
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
        if (!user.authenticationType.google || googleUserId !== user.authenticationType.google.uuid) {
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
          error.statusCode = 500
        }
        return res.status(error.statusCode).json({ message: "could not signin using google", error: error });
      }
    }

    if (!email || !password) {
      return res.status(400).json("Please provide email and password");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json("A user for this email could not be found!");
    }
    const isEqual = await bcrypt.compare(
      password,
      user.authenticationType.form.password
    );
    if (!isEqual) {
      return res.status(401).json("Wrong password!");
    }
    const { accessToken, refreshToken } = await generateTokens(user);

    return res.status(201).json({
      message: "user logged in successfully",
      token: accessToken,
      refreshToken: refreshToken,
      userId: user._id.toString(),
      subscription: user.subscription,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    return res.status(err.statusCode).json({ message: "could not sign user in", err: err });
  }
};

const refreshToken = async (req, res) => {
  verifyRefreshToken(req.body.refreshToken)
    .then(({ tokenDetails }) => {
      const payload = { userId: tokenDetails.userId }
      const accessToken = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "5h" }
      );
      res.status(200).json({
        error: false,
        accessToken,
        message: "Access token created successfully",
      });
    })
    .catch((err) => res.status(400).json(err));
}

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
  refreshToken,
  userLogout,
  forgotPassword,
  changePassword,
};
