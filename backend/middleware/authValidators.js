const {body, check} = require("express-validator");

const validateSignUp = check("accessToken") ? [] : [body("email").trim().isEmail().withMessage("Please enter a valid email!").normalizeEmail(), body("password").trim().not().isEmpty()];
// const validateSignUp = [];

// exports.validateSignUp = [];
module.exports = validateSignUp;