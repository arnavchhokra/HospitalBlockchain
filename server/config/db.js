const mongoose = require('mongoose')
const colors = require('colors')
const env = require('dotenv')

env.config()

const connectDB = async () => {
    try {
         await mongoose.connect(process.env.MONGO_URI)
        console.log("database connected".bgGreen.white);
    } catch (error) {
        console.log(`error while connecting to mongodb ${error}`.bgRed.black);
    }
}


module.exports = connectDB