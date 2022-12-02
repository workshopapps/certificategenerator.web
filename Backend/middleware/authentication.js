const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { verifyRefreshToken } = require("../controllers/verifyRefreshToken")

const authentication = async (req, res, next) => {
  const authHeader = req.headers.authorization
  const refreshToken = req.body.refreshToken

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    verifyRefreshToken(refreshToken)
      .then(({ tokenDetails }) => {
        const payload = { userId: tokenDetails.userId };
        const token = jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: "5h" }
        );
        const newPayload = jwt.verify(token, process.env.JWT_SECRET);
        const { userId } = newPayload
        req.user = User.findById(userId);
        return next();
      })
      .catch((error) => {
        console.error(error);
        res.status(401).json({
          success: false,
          msg: "Session Expired",
        });
      })
    return
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({
      success: false,
      msg: "Token not authorized",
    });
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const { userId } = payload
    req.user = User.findById(userId);
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({
      success: false,
      msg: "Session Expired",
    });
  }



};

module.exports = authentication;
