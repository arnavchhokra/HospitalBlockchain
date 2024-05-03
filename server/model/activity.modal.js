const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema({
    username: { type: String },
    createcontract: { type: Boolean },
    confirmbyinsuranceprovider: { type: Boolean },
    confirmbybank: { type: Boolean },
    confirmbankbyinsuranceprovider: { type: Boolean },
    confirmbyhospital: { type: Boolean },
    recalculatepolicy: { type: Boolean },
    confirmpolicybycustomer: { type: Boolean },
    invokeclaimbyinsuranceprovider: { type: Boolean },
    confirminvokeclaimbyhospital: { type: Boolean },
    confirmbydoctor: { type: Boolean },
    confirmclaimrequrestbyinsuranceprovider: { type: Boolean }

})

module.exports = mongoose.model('Activity', activitySchema) 