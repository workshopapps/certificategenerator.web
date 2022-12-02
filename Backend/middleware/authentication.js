const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { verifyRefreshToken } = require("../controllers/verifyRefreshToken")

const authentication = async (req, res, next) => {
  let authHeader = req.headers.authorization;
  const refreshToken = req.headers.refreshToken
  console.log(refreshToken)
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    verifyRefreshToken(refreshToken)
      .then(({ tokenDetails }) => {
        const payload = { userId: tokenDetails.userId };
        authHeader = jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: "5h" }
        );

        console.log(authHeader)
        // res.status(200).json({
        //   error: false,
        //   accessToken,
        //   message: "Access token created successfully",
        // });

        const token = authHeader.split(" ")[1];
        payload = jwt.verify(token, process.env.JWT_SECRET);
        const { id } = payload;
        req.user = User.findById(id);
        next();
      })
      .catch((error) => {
        console.error(error);
        res.status(401).json({
          success: false,
          msg: "Session Expired",
        });
      })
  }


  // if (!token) {
  //   res.status(401).json({
  //     success: false,
  //     msg: "Token not authorized",
  //   });
  // }
};

module.exports = authentication;
