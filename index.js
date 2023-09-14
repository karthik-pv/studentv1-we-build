require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const connectToMongoDB = require('./config/MongoDB')
const studentRoute = require('./routes/studentRoute')

const app = express()

const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL

const startApp = async () => {
    // Middleware
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    // Connect To Database
    await connectToMongoDB(MONGO_URL)

    // Routes
    app.use('/api/v1/student', studentRoute)

    app.listen(PORT, () => {
        console.log(`Server running on PORT: ${PORT}`)
    })
}
startApp()