const {body, check} = require("express-validator");

const validateSignUp = check("password") ? [body("email").trim().isEmail().withMessage("Please enter a valid email!").normalizeEmail(), body("password").trim().not().isEmpty()] : [];
// exports.validateSignUp = [];
module.exports = validateSignUp;