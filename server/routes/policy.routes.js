const express = require('express')
const { setPolicy, getPolicy } = require('../controllers/policy.controller')



const router = express.Router()

router.post('/setpolicy', setPolicy)
router.get('/getpolicy', getPolicy)

module.exports = router