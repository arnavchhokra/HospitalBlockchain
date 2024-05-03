const express = require('express')
const { register, login, getHospitals, approve } = require('../controllers/hospitallist.controller')


const router = express.Router()

router.post('/hospitalregister', register)
router.post('/hospitallogin', login)
router.get('/hospitallist', getHospitals)
router.put('/approvehospital', approve)
module.exports = router 
