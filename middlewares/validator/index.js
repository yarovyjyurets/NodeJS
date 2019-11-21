const signUpSchema = require('./shemas/signup');
const validator = require('express-joi-validation').createValidator({ passError: true });

module.exports = {
  validateSignUp: validator.body(signUpSchema)
}