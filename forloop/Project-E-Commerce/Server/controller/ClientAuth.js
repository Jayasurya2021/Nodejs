const bcrypt = require("bcrypt")
const user = require("../models/CllientRegisterModel")
async function ClientRegister(req, res) {
    try {
        const { name, email, password } = req.body

        const hashedPassword = await bcrypt.hash(password, 10)
        const userData = await user.create({
            name: name,
            email: email,
            password: hashedPassword
        })
        if (userData) {
            console.log(userData)
            res.status(200).json({
                message: "Register Succesfull",
                data: userData
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

        res.status(200).json({
            message: "Login Successfull"
        })
    }catch(error){
        res.status(400).json({
            message: error.message
        })

    }
}

module.exports = {
    ClientRegister
}