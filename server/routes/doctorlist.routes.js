const express = require('express')
const { register, login, getDoctors, approve } = require('../controllers/doctorlist.controller')


const router = express.Router()

router.post('/doctorregister', register)
router.post('/doctorlogin', login)
router.get('/doctorlist', getDoctors)
router.put('/approvedoctor', approve)
module.exports = router 
