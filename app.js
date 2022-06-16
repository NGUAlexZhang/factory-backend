const express = require('express')
const bodyParser = require('body-parser')
const cors=require('cors')
const customers = require('./routes/customers')
const commodity = require('./routes/commodities')
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/api/v1/customers', customers)
app.use('/api/v1/commodities', commodity)

module.exports = app