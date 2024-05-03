const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    logintype: { type: String, require: true },
    firstname: { type: String, require: true },
    lastname: { type: String, require: true },
    email: { type: String },
    mobile: { type: String, require: true },
    password: { type: String, require: true }
    
})


module.exports = mongoose.model('users', userSchema)