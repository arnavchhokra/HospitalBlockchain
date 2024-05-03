const express = require('express')
const { register, login, getuser } = require('../controllers/user.controller')

const router = express.Router()

router.post('/register', register);
router.post('/login', login)
router.get('/user:/userid', getuser)

module.exports = router