const Joi = require("@hapi/joi");


const authSchema = Joi.object({
    email : Joi.string().required().email().lowercase(),
    password : Joi.string().min(6).required()
})

const loginSchema = Joi.object({
    email : Joi.string().required().email().lowercase(),
    password : Joi.string().min(6).required()
})

  module.exports = {
    authSchema,
    loginSchema
}