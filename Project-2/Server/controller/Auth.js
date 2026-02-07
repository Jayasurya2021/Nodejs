const userModels = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const AdminModels = require("../models/AdminModels")


const register = async (req, res) => {
    try {
        const { name, email, mobile, password, role } = req.body
        const findEmail = await userModels.findOne({ email })
        const findMobile = await userModels.findOne({ mobile })
        if (findEmail && findMobile) {
            res.status(400).json({ message: "this email id or mobile number already used" })
        }
        if (role === "user") {

            const bycryptPassword = await bcrypt.hash(password, 10)

            const createUser = await userModels.create({
                name,
                email,
                mobile,
                password: bycryptPassword
            })
            const token = jwt.sign({
                id: createUser._id,
                email: createUser.email
            },
                "secreateKey1234",
                { expiresIn: "10d" }
            )

            res.status(200).json({ message: "Register succesfull", createUser, token })
            console.log(createUser, token)
        }

        if (role === "admin") {

            const bycryptPassword = await bcrypt.hash(password, 10)

            const adminUser = await AdminModels.create({
                name,
                email,
                mobile,
                password: bycryptPassword
            })
            const token = jwt.sign({
                id: adminUser._id,
                email: adminUser.email
            },
                "secreateKey1234",
                { expiresIn: "10d" }
            )

            res.status(200).json({ message: "Register succesfull", adminUser, token })
            console.log(adminUser, token)
        }



    } catch (error) {
        res.status(400).json({ message: error.message })
        console.log(error)
    }
}
const login = async (req, res) => {
    try {
        const { user, password } = req.body
        const findUser = await userModels.findOne({
            $or: [
                { email: user },
                { mobile: user }
            ]
        })
        if (!findUser) {
            res.status(400).json({ message: "this email not register" })
        }
        const comparePassword = await bcrypt.compare(password, findUser.password)
        if (!comparePassword) {
            res.status(400).json({ message: "password is mismatch" })
        }
        const token = jwt.sign(
            {
                id: findEmail._id,
                email: findEmail.email
            },
            "secreateKey1234",
            { expiresIn: "10d" }
        )
        res.status(200).json({ message: "login succesfull", token })
        console.log(`token: ${token}`)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = {
    register,
    login
}