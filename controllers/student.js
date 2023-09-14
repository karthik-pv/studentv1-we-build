const Student = require('../models/Student')
const studentJoi = require('../schema/studentJoi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.register = async (req, res) => {
    try {
        const { usn, email, phone, name, sem, branch, section, password, mainSubjects, electiveSubjects } = await studentJoi.validateAsync(req.body)

        // check if student already exsist
        const savedStudent = await Student.findOne({ usn })
        if (savedStudent !== null) {

            return res.status(403).json({
                message: `Student with USN ${usn} already exsist.`
            })
        }

        // pre processing data
        const newPhone = `+91 ${phone}`
        const hashedPassword = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT_ROUNDS))

        // create instance of student
        const student = new Student({ usn, email, phone: newPhone, name, sem, branch, section, password: hashedPassword, mainSubjects, electiveSubjects })

        // save student to database
        await student.save()
        res.status(200).json({ message: 'ok' })
    } catch (error) {

        // sending joi validation error messages
        const { details } = error
        if (details) {
            for (errMsg of details) {
                res.status(400).json({
                    message: errMsg.message
                })
            }
        }

        // server error
        res.status(500).json({
            message: 'Somthing went wrong'
        })
        console.log(error)
    }
}

module.exports.login = async (req, res) => {
    try {
        const { usn, password } = req.body

        // check if student exsist
        const savedStudent = await Student.findOne({ usn })
        if (savedStudent === null) {

            return res.status(404).json({
                message: `Student with USN ${usn} not found.`
            })
        } else {

            // check if password is correct
            if (await bcrypt.compare(password, savedStudent.password)) {

                // create a jwt token
                const { JWT_SECRET, JWT_EXPIRY } = process.env
                const payload = { _id: savedStudent._id }
                const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY })

                // sending token
                res.status(200).json({ token })
            } else {

                // wrong password
                return res.status(401).json({
                    message: 'Wrong password.'
                })
            }
        }

    } catch (error) {

        // server error
        res.status(500).json({
            message: 'Somthing went wrong'
        })
        console.log(error)
    }
}