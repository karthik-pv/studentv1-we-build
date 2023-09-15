const Joi = require('joi')

const studentRegisterJoi = Joi.object({
    usn: Joi.string().alphanum().pattern(/^\d{1}RN\d{2}[A-Z]{2}\d{3}$/).length(10).required(),

    email: Joi.string().email().required(),

    phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),

    name: Joi.string().pattern(/^[a-zA-Z\s]+$/).required(),

    sem: Joi.number().min(1).max(8).required(),

    branch: Joi.string().length(2).pattern(/^[A-Z]+$/).required(),

    section: Joi.string().length(1).pattern(/^[A-Z]+$/).required(),

    password: Joi.string().min(7).max(25).required(),

    mainSubjects: Joi.array(),

    electiveSubjects: Joi.array(),
})

const studentEditJoi = Joi.object({
    usn: Joi.string().alphanum().length(10).pattern(/^\d{1}RN\d{2}[A-Z]{2}\d{3}$/),

    email: Joi.string().email(),

    phone: Joi.string().length(10).pattern(/^[0-9]+$/),

    name: Joi.string().pattern(/^[a-zA-Z\s]+$/),

    sem: Joi.number().min(1).max(8),

    branch: Joi.string().length(2).pattern(/^[A-Z]+$/),

    section: Joi.string().length(1).pattern(/^[A-Z]+$/),

    password: Joi.string().min(7).max(25),

    mainSubjects: Joi.array(),

    electiveSubjects: Joi.array(),
})

module.exports = { studentEditJoi, studentRegisterJoi }