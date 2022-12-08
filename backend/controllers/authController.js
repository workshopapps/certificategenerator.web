const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const config = require("../utils/config");
const UserToken = require("../models/UserToken");
const { generateTokens } = require("../utils/generateToken");
const { sendChangePasswordEmail } = require("../utils/email");
const { verifyRefreshToken } = require("../middleware/verifyRefreshToken");

const { OAuth2Client } = require("google-auth-library");
const {
  handleAsync,
  createApiError,
  handleResponse
} = require("../utils/helpers");
const client = new OAuth2Client(
  "52168821352-4sc11trj4qtq95051mrnrbinfgmla3ai.apps.googleusercontent.com"
);

//function to verify user google access token
async function verify(_token) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: _token,
      audience:
        "52168821352-4sc11trj4qtq95051mrnrbinfgmla3ai.apps.googleusercontent.com"
    });
    return ticket.getPayload();
  } catch (error) {
    throw createApiError("could not verify access token", 401);
  }
}

//function to check if user already exists
const userExist = async _email => {
  const user = await User.findOne({ email: _email });
  if (user) {
    return true;
  }
  return false;
};

const userSignup = handleAsync(async (req, res, next) => {
  let { accessToken, email, password, subscriptionPlan } = req.body;

  //google signup
  if (req.body.accessToken) {
    const payload = await verify(accessToken);
    const googleUserId = payload["sub"];
    email = payload["email"];

    //check db if user already exists
    if (await userExist(email))
      throw createApiError("email already in use", 401);

    //if not create new user
    const newUser = new User({
      email: email,
      authenticationType: {
        google: {
          uuid: googleUserId
        }
      },
      subscription: subscriptionPlan
    });

    const createdUser = await newUser.save();

    return res.status(201).json(
      handleResponse(
        {
          id: createdUser._id,
          email: createdUser.email
        },
        "New User has been created."
      )
    );
  }

  //Form signup
  const errors = validationResult(req);

  if (!errors.isEmpty())
    throw createApiError("user validation failed", 422, errors.array);

  if (await userExist(email)) throw createApiError("email already in use", 401);

  const hash = await bcrypt.hash(password, 10);

  const newUser = new User({
    email: email,
    authenticationType: {
      form: {
        password: hash
      }
    },
    subscription: subscriptionPlan
  });

  const createdUser = await newUser.save();

  res.status(201).json(
    handleResponse(
      {
        id: createdUser._id,
        email: createdUser.email
      },
      "New User has been created."
    )
  );
});

const userLogin = handleAsync(async (req, res, next) => {
  var { email, password } = req.body;

  if (req.body.accessToken) {
    const payload = await verify(req.body.accessToken);

    const googleUserId = payload["sub"];

    email = payload["email"];

    const user = await User.findOne({ email });

    if (!user)
      throw createApiError("A user for this email could not be found!", 401);

    if (
      !user.authenticationType.google ||
      googleUserId !== user.authenticationType.google.uuid
    )
      throw createApiError(
        "google login hasn't been linked to this email, please login with the form",
        401
      );

    const { accessToken, refreshToken } = await generateTokens(user);

    return res.status(200).json(
      handleResponse(
        {
          token: accessToken,
          refreshToken: refreshToken,
          userId: user._id.toString(),
          subscription: user.subscription
        },
        "user logged in successfully"
      )
    );
  }

  if (!email || !password)
    throw createApiError("Please provide email and password", 400);

  const user = await User.findOne({ email });

  if (!user)
    throw createApiError("A user for this email could not be found!", 401);

  const isEqual = await bcrypt.compare(
    password,
    user.authenticationType.form.password
  );

  if (!isEqual) throw createApiError("Wrong password!", 401);

  const { accessToken, refreshToken } = await generateTokens(user);

  return res.status(201).json(
    handleResponse(
      {
        token: accessToken,
        refreshToken: refreshToken,
        userId: user._id.toString(),
        subscription: user.subscription
      },
      "user logged in successfully"
    )
  );
});

const refreshToken = handleAsync(async (req, res) => {
  const { tokenDetails } = await verifyRefreshToken(req.body.refreshToken);

  const payload = { userId: tokenDetails.userId };

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "5h"
  });

  res
    .status(200)
    .json(handleResponse({ accessToken }, "Access token created successfully"));
});

const userLogout = handleAsync(async (req, res) => {
  const userToken = await UserToken.findOne({ token: req.body.refreshToken });

  if (!userToken)
    return res.status(200).json(handleResponse({}, "Logged Out Sucessfully"));

  await userToken.remove();

  res.status(200).json(handleResponse({}, "Logged Out Sucessfully"));
});

const forgotPassword = handleAsync(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) throw createApiError("User does not exist", 400);

  const token = crypto.randomBytes(10).toString("hex");

  const link = `${process.env.BASE_URL}/changepassword/${user._id}/${token}`;

  await sendChangePasswordEmail({ email, link });

  res
    .status(200)
    .json(handleResponse({}, "password reset link sent to your email account"));
});

const changePassword = handleAsync(async (req, res) => {
  const token = req.params.token;

  if (!token) throw createApiError("token is required", 400);

  const { newpassword, confirmpassword } = req.body;

  if (!newpassword || !confirmpassword)
    throw createApiError("newpassword and confirmpassword are required", 400);

  if (newpassword != confirmpassword)
    throw createApiError("both passwords are not the same", 400);

  const user = await User.findById(req.params.userId);

  user.authenticationType.form.password = await bcrypt.hash(newpassword, 10);

  await user.save();

  res.status(200).json(handleResponse({}, "password changed"));
});

module.exports = {
  userSignup,
  userLogin,
  refreshToken,
  userLogout,
  forgotPassword,
  changePassword
};
