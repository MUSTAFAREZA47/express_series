const User = require("../model/userSchema")
const emailValidator = require('email-validator')

exports.signUp = async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body

    console.log(name, email, password, confirmPassword)

    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "Every field is required."
        })
    }
    // Using email validator to validate email after importing above
    const validEmail = emailValidator.validate(email)
    if (!validEmail) {
        return res.status(400).json({
            success: false,
            message: "Please provide valid email Id."
        })
    }

    //    matching password and confirm password
    if (password !== confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "Password and confirm password is not matching."
        })
    }

    try {
        const userInfo = await User(req.body).save()

        res.status(200).json({
            success: true,
            message: "user signUp successfully",
            userInfo
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "user signUp failed"

        })
    }


}

exports.signIn = async (req, res) => {

    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Every field is manadatory."
        })
    }

    try {
        const userInfo = await User.findOne({ email }).select('password')


        if (!userInfo || userInfo.password !== password) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credential."
            })
        }

        const token = userInfo.jwtToken()
        userInfo.password = undefined

        const cookieOption = {
            maxAge: 24 * 60 * 60 * 100,
            httpOnly: true
        }

        res.cookie("token", token, cookieOption)
        res.status(200).json({
            success: true,
            userInfo,
            
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })

    }
}