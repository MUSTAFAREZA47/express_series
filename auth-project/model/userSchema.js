const mongoose = require('mongoose')
const JWT = require('jsonwebtoken')

const  userSchema  = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "username is requied"],
        minLength: [5, "Name must be atleast 5 char"],
        trim: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, "email is required"]
    },
    password: {
        type: String,
        required: true
    },
    forgotPassword: {
        type: String
    },
    forPasswordExpiryDate: {
        type: Date
    },
    forgotPasswordToken: {
        type: String
    }
}, {
    timestamps: true
})

userSchema.methods = {
    jwtToken() {
        return JWT.sign(
            {id: this._id, email: this.email},
            process.env.SECRET,
            // {exprireIn: "24h"}
        )
    }
}

const User = mongoose.model("Users", userSchema)

module.exports = User