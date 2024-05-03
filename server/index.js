const express = require('express')
const colors = require('colors')
const cors = require('cors')
const morgon = require('morgan')
const connectDB = require('../server/config/db')
const router = require('./routes/user.routes')
const contractrouter = require('./routes/contract.routes')
const activityrouter = require('./routes/activity.routes')
const bankrouter = require('./routes/bank.routes')
const hospitalrouter = require('./routes/hospital.routes')
const policyrouter = require('./routes/policy.routes')
const hospitallistrouter = require('./routes/hospitallist.routes')
const doctorlistrouter = require('./routes/doctorlist.routes')
require('dotenv').config()


const app = express()
const PORT = 4000

app.use(cors())
app.use(express.json())
app.use(morgon('dev'))
app.use('/api/v1/user', router)
app.use('/api/v1/contract', contractrouter)
app.use('/api/v1/activity', activityrouter) 
app.use('/api/v1/bank', bankrouter)
app.use('/api/v1/hospital', hospitalrouter)
app.use('/api/v1/policy', policyrouter)
app.use('/api/v1/hospitallist', hospitallistrouter)
app.use('/api/v1/doctorlist', doctorlistrouter)
connectDB()
app.get('/', (req, res) => {
    res.send("welocome to homepage")
        .end()
})



app.listen(PORT, () => {
    console.log(`Server listing on ${`http://localhost:${PORT}`}`.bgMagenta.white);
})