const mongoose = require('mongoose')

const DoctorListSchema = new mongoose.Schema({
    firstname: { type: String, require: true },
    lastname: { type: String, require: true },
    mobile: { type: String, require: true },
    email: { type: String, require: true, unique: true, lowercase: true, },
    password: { type: String, require: true },
    specialization: { type: String, required: true, },
    registrationDate: { type: Date, default: Date.now },
    isApproveByAdmin: { type: Boolean, require: true },
})

module.exports = mongoose.model('doctorlist', DoctorListSchema)
