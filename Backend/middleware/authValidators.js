const {body, check} = require("express-validator")

exports.validateSignUp = check("password") ? [body("email").trim().isEmail().withMessage("Please enter a valid email!").normalizeEmail(), body("password").trim().not().isEmpty()] : [];
// exports.validateSignUp = [];
