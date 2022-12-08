const UserToken = require("../models/UserToken.js");
const jwt = require("jsonwebtoken");
const { createApiError } = require("../utils/helpers.js");

const verifyRefreshToken = refreshToken => {
  const privateKey = process.env.REFRESH_TOKEN;

  return new Promise((resolve, reject) => {
    UserToken.findOne({ token: refreshToken }, (err, doc) => {
      if (!doc) return reject(createApiError("Invalid refresh token", 400));

      jwt.verify(refreshToken, privateKey, (err, tokenDetails) => {
        if (err) return reject(createApiError("Invalid refresh token", 400));

        resolve({
          tokenDetails,
          error: false,
          message: "Valid refresh token"
        });
      });
    });
  });
};

module.exports = { verifyRefreshToken };
