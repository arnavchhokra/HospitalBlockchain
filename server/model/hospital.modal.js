const mongoose = require('mongoose')

const hospitalSchema = new mongoose.Schema({
    username:{type: String, require: true}, 
    active: { type: Boolean, require: true },
    score: { type: String, require: true },
    physical: { type: Boolean, require: true },

})

module.exports = mongoose.model('Hospital', hospitalSchema)  