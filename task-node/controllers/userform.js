const usermodel = require("../models/usermodel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

async function Register(req, res) {
    try {

        const { name, email, password } = req.body

        const findEmail = await usermodel.findOne({ email: email })
        if (findEmail) {

            return res.status(400).json({ message: "this email already used" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const userData = usermodel.create({
            name: name,
            email: email,
            password: hashedPassword
        })
z

        const token = await jwt.sign({ id: userData._id, email }, "seretKey", { expiresIn: "1d" })
        return res.status(200).json({
            message: "Register Succesfull",
            data: userData,
            token
        })

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }


}

module.exports = { Register }