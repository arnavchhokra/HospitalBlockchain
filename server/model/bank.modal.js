const mongoose = require('mongoose')

const bankSchema = new mongoose.Schema({
    username:{type: String, require: true}, 
    verified: { type: Boolean, require: true },
    active: { type: Boolean, require: true },
    credit: { type: String, require: true },

})

module.exports = mongoose.model('Bank', bankSchema)  