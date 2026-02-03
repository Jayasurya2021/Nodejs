const userModels = require("../models/userModels")
const bcrypt = require("bcrypt")

const register = async (req, res) => {
    try {
        const { name, email, gender, password } = req.body
        const bycryptPassword = await bcrypt.hash(password, 10)

        const createUser = await userModels.create({
            name,
            email,
            gender,
            password: bycryptPassword
        })
        res.status(201).json({ message: "Register succesfull" , createUser })
        console.log(createUser)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
const login = async (req, res) => {
    try {
        const {email,password } = req.body
        const findEmail = await userModels.findOne({email: email})
        const comparePassword = await bcrypt.compare(password, findEmail.password)
        if (!findEmail) {
            res.status(400).json({message:"this email not register"})
        }
        if(!comparePassword){
            res.status(400).json({message:"password is mismatch"})
        }
        res.status(201).json({ message: "login succesfull"})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

module.exports = {
    register,
    login
}