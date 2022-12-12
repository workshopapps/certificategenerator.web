const {body, check} = require("express-validator");

const validateSignUp = check("email") ? [body("email").trim().isEmail().withMessage("Please enter a valid email!").toLowerCase(), body("password").trim().not().isEmpty()] : [];
module.exports = validateSignUp;