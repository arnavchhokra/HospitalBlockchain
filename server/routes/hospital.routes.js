const express = require('express')
const { setHospital, gethospital } = require('../controllers/hospital.controller')



const router = express.Router()
router.post('/sethospital', setHospital)
router.get('/gethospital', gethospital)


module.exports = router 