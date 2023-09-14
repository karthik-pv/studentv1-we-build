const mongoose = require('mongoose')

const connectToMongoDB = async (URL) => {
    try {
        const res = await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('MongoDB Connected Successfully')
    } catch (error) {
        console.log(`Cannot connect To Database`)
        console.log(error)
    }
}

module.exports = connectToMongoDB