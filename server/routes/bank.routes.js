const express = require('express')
const { setbank, getbank } = require('../controllers/bank.controller')


const router = express.Router()

router.post("/setbankdetails", setbank)
router.get("/getbankdetails", getbank)



module.exports = router