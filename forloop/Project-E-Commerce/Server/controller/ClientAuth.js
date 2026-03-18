const bcrypt = require("bcrypt")
const user = require("../models/CllientRegisterModel")
const jwt = require("jsonwebtoken")

async function ClientRegister(req, res) {
    try {
        const { name, email, password } = req.body

        const hashedPassword = await bcrypt.hash(password, 10)
        const userData = await user.create({
            name: name,
            email: email,
            password: hashedPassword
        })
        const token = jwt.sign({ id: userData._id, email: email },
            "privateKey",
            { expiresIn: "3d" })
        if (userData) {
            console.log(userData)

            res.status(200).json({
                message: "Register Succesfull",
                data: userData,
                token: token
            })
        }

        res.status(400).json({
            message: "Register Failed"
        })

    } catch (error) {

    }
}

async function Login(req, res) {
    try {
        const { email, password } = req.body
        const findEmailId = await user.findOne({ email: email })
        if (!findEmailId) {
            res.status(400).json({
                message: "This Email id not Register"
            })
        }

        const comparePassword = bcrypt.compare(findEmailId.password, password)

        if (!comparePassword) {
            res.status(400), json({
                message: "your Password is Incorrect"
            })
        }
        const token = jwt.sign({ id: userData._id, email: email },
            "privateKey",
            { expiresIn: "3d" })

        res.status(200).json({
            message: "Login Successfull",
            token: token
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })

    }
}

module.exports = {
    ClientRegister,
    Login
}