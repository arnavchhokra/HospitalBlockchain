const mongoose = require('mongoose')

const hospitalListSchema = new mongoose.Schema({
    hospitalname: { type: String, require: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    registrationDate: { type: Date, default: Date.now },
    isApproveByAdmin: { type: Boolean, require: true },
})


module.exports = mongoose.model('hospitallist', hospitalListSchema)