const mongoose = require('mongoose')

const recalCulatedPolicySchema = new mongoose.Schema({
    username:{type: String, require: true}, 
    premiumpayment: { type: Boolean, require: true },
    policyname: { type: String, require: true },
    insurancedate: { type: String, require: true },
    maturitydate: { type: String, require: true },
    finalpremiumoffer: { type: String, require: true },
    assured: { type: String, require: true },

})

module.exports = mongoose.model('recalCulatedPolicy', recalCulatedPolicySchema)  