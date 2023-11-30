require('dotenv').config();
const express = require('express')

// CORS 
const cors = require('cors')


// init connection to DB
const connectToDb = require('./config/database')
connectToDb()

const app = express();

// Express middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cors())

// using Routes
const userRoutes = require('./routes/userRoutes')

app.use('/', userRoutes)

module.exports = app