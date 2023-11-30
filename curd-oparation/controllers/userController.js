const User = require('../models/userModel')

exports.home = (req, res) => {
    res.send("Hello World!")
}

exports.createUser = async (req, res) => {
    try {
        // extract info from frontend
        const { name, email } = req.body

        const user = await User.create({
            name,
            email
        })

        if (!name || !email) {
            throw new Error("Please give name and email")
        }

        const existUser = User.findOne({ email })

        if (existUser) {
            throw new Error("Email exist already.")
        }


        res.status(201).json({
            success: true,
            message: "User Created Successfully",
            user,
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

exports.getUsers = async (req, res) => {
    try {

        const getUser = await User.find({})

        if (getUser.length < 1) {
            throw new Error("There is no user in database.")
        }

        res.status(200).json({
            success: true,
            getUser
        })



    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: error.message
        })
    }

}

exports.editUsers = async (req, res) => {
    try {
        const editUser = await User.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({
            success: true,
            message: "User updated successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}

exports.deleteUsers = async (req, res) => {
    try {
        const userId = req.params.id
        const deleteUser = await User.findByIdAndDelete(userId)

        res.status(200).json({
            success: true,
            message: "User deleted Successfully."

        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}