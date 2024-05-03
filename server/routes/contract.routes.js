const express = require('express')
const { createcontract, getContract } = require('../controllers/contract.controller')


const router = express.Router()
router.post('/createcontract', createcontract);
router.get('/getcontract', getContract);

module.exports = router