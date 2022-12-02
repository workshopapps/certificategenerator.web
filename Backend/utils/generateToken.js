const jwt = require("jsonwebtoken");
const UserToken = require("../models/UserToken.js");

const generateTokens = async (user) => {
    try {
        const payload = { userId: user._id }
        const accessToken = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "5h" }
        );
        const refreshToken = jwt.sign(
            payload,
            process.env.REFRESH_TOKEN,
            { expiresIn: "1w" }
        );

        const userToken = await UserToken.findOne({ userId: user._id });
        if (userToken) await userToken.remove();

        await new UserToken({ userId: user._id, token: refreshToken }).save();
        return Promise.resolve({ accessToken, refreshToken });
    } catch (err) {
        return Promise.reject(err);
    }
};

module.exports = { generateTokens };