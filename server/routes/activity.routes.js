const express = require('express')
const { setActivity, getActivity, updateActivity } = require('../controllers/activity.controller')


const router = express.Router()

router.post('/setactivity', setActivity);
router.get('/getactivity', getActivity)
router.put('/updateactivity', updateActivity)

module.exports = router 