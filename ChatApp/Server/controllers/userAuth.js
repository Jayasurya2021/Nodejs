const userModels = require ("../models/userData")
const bcrypt = require("bcrypt")

const register = async (req, res)=>{
    try {
        const {userName, name, email, mobile, password} = req.body
        const findEmailId = await userModels.findOne({email})
        const findMobile = await userModels.findOne({mobile})
        if(findEmailId){
           return req.status(201).json({message:"this email id already used"})
        }
        if(findMobile){
           return req.status(201).json({message:"this mobile number already used"})
        }
        const hassedPassword = await bcrypt.hash(password,10)
        const createUser = await userModels.create({
            userName,
            name,
            email,
            mobile,
            password:hassedPassword
        })
        res.status(200).json({createUser})
    } catch (error) {
      res.status(400).json({error:error.message})  
    }
}

module.exports = {
    register
}