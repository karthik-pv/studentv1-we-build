const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    usn: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    name: {
        type: String
    },
    sem: {
        type: Number
    },
    branch: {
        type: String
    },
    section: {
        type: String
    },
    password: {
        type: String
    },
    mainSubjects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'subjects'
        }
    ],
    electiveSubjects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'subjects'
        }
    ],
}, { timestamps: true })

const Student = mongoose.model('student', studentSchema)
module.exports = Student