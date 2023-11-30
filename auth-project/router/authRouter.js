const express = require('express')
const { signUp, signIn } = require('../controller/authController')

const authRouter = express.Router()

authRouter.post('/signUp', signUp)
authRouter.post('/signIn', signIn)

module.exports = authRouter