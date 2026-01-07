const {userData} = require('../models/userModels')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const registerData = async (req, res) => {
    try {
        const { name, password, email, mobile } = req.body
        const findEmail = await userData.findOne({ email })
        if (findEmail) {
            return res.status(400).json({ message: "this email id already used " })
        }

        const userDatas = await userData.create({
            name,
            password,
            email,
            mobile
        })
        res.status(200).json(userDatas)

        // if (!userData) {
        //     return res.status(400).json({ message: "user data not founded" })
        // }

    } catch (error) {
        res.status(400).json({ message: error.message })
    }


}

const LoginData = async (req, res) => {
    try {
        const { email, password } = req.body
        const findEmail = await userData.findOne({ email: email })
        console.log(findEmail)
        if (!findEmail) {
            return res.status(400).json({ message: "you are not register" })
        }
        console.log(findEmail.password)
        console.log(password)
        const comparePassword = await bcrypt.compare(password, findEmail.password)
        if (!comparePassword) {

            return res.status(400).json({ message: "password incorrect" })
            
        }
       


            res.status(200).json({message:'login successful'})
        
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}
module.exports = {
    registerData,
    LoginData
}