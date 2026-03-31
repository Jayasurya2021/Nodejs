const bcrypt = require("bcrypt")
const user = require("../models/CllientRegisterModel")
const jwt = require("jsonwebtoken")

async function ClientRegister(req, res) {
    try {
        const { name, email, password } = req.body

        const findEmailId = await user.findOne({ email: email })

        if (findEmailId) {
            return res.status(400).json({
                message: "This email already used"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const userData = await user.create({
            name: name,
            email: email,
            password: hashedPassword
        })
         console.log(userData)
        const token = jwt.sign({ id: userData._id, email: email },
            "privateKey",
            { expiresIn: "3d" })


        return res.status(201).json({
            message: "Register Succesfull",
            data: userData,
            token

        })
       
    } catch (error) {
        console.log(error)
        return res.status(500).jsno({
            message: error.message
        })
    }
}

async function Login(req, res) {
    try {
        const { email, password } = req.body
        const findEmailId = await user.findOne({ email: email })
        if (!findEmailId) {
            return res.status(400).json({
                message: "This Email id not Register"
            })
        }

        const comparePassword = await bcrypt.compare(password, findEmailId.password)

        if (!comparePassword) {
            return res.status(400).json({
                message: "your Password is Incorrect"
            })
        }
        const token = jwt.sign({ id: findEmailId._id, email: email },
            "privateKey",
            { expiresIn: "3d" })

        return res.status(201).json({
            message: "Login Successfull",
            token
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })

    }
}

module.exports = {
    ClientRegister,
    Login
}