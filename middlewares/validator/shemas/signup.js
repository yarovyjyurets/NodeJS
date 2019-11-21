const joi = require('@hapi/joi');
const ValidationError = require('./validationError');

const signUpSchema = joi.object({
  email: joi.string().email().required().error(new ValidationError('Email is invalid')),
  password: joi.string().trim().alphanum().min(3).max(20).required(),
  passwordConfirmation: joi.valid(joi.ref('password')).error(new ValidationError('Passwords are not matched')),
});

module.exports = signUpSchema;