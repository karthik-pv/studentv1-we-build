const Joi = require('joi')

const studentJoi = Joi.object({
    usn: Joi.string().alphanum().length(10).required(),

    email: Joi.string().email().required(),

    phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),

    name: Joi.string().required(),

    sem: Joi.number().min(1).max(8).required(),

    branch: Joi.string().length(2).required(),

    section: Joi.string().length(1).required(),

    password: Joi.string().min(7).max(25).required(),

    mainSubjects: Joi.array(),

    electiveSubjects: Joi.array(),
})

module.exports = studentJoi