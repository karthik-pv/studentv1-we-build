const express = require('express')
const router = express.Router()

// Controllers
const { register, login, edit, remove, info, students } = require('../controllers/student')

// Routes
router.post('/register', register)
router.post('/login', login)
router.patch('/edit/:id', edit)
router.delete('/remove/:id', remove)
router.get('/info/:id', info)
router.get('/all', students)

module.exports = router
