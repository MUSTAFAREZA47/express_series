const express = require('express')

const { home, createUser, getUsers, deleteUsers, editUsers } = require("../controllers/userController")


const router = express.Router()

router.get('/', home)
router.post('/createUser', createUser)
router.get('/getUsers', getUsers)
router.put('./editUsers/:id', editUsers)
router.delete('/deleteUsers/:userId', deleteUsers)

module.exports = router