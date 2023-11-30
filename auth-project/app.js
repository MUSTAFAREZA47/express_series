require('dotenv').config()
const express = require('express')
const app = express()

// Connecting to Database
const connectToDb = require('./config/authdb.js')
connectToDb()


app.use(express.json())
app.use(express.urlencoded({extended: true}))

// importing router
const authRouter = require('./router/authRouter')

app.use('/api/auth/', authRouter)


module.exports = app