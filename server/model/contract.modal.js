const mongoose = require('mongoose')

const contractSchema = new mongoose.Schema({
    username:{type: String, require: true}, 
    userwalletaddress: {type: String, require: true}, 
    aadhar: { type: String, require: true },
    sex: { type: String, require: true },
    bank: { type: String },
    accountnumber: { type: String, require: true },
    insuranceprovider: { type: String, require: true },
    policy: { type: String, require: true },
    hospital: { type: String, require: true },
    pan: { type: String, require: true },
    assured: { type: String, require: true },
    policyterm: { type: String, require: true },
    payment: { type: String, require: true },
    premium: { type: Boolean, require: true }
})


module.exports = mongoose.model('contract', contractSchema)