const userModels = require ("../models/userData");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const register = async (req, res)=>{
    try {
        const {userName, name, email, mobile, password} = req.body
        const findEmailId = await userModels.findOne({email})
        const findMobile = await userModels.findOne({mobile})
        if(findEmailId){
           return res.status(201).json({message:"this email id already used"})
        }
        if(findMobile){
           return res.status(201).json({message:"this mobile number already used"})
        }
        const hassedPassword = await bcrypt.hash(password,10)
        const createUser = await userModels.create({
            userName,
            name,
            email,
            mobile,
            password:hassedPassword
        })
        const token = await jwt.sign(
            {id: createUser.id},
            process.env.JWT_SECRET,
            {expiresIn:"10d"}
        )
        res.status(200).json({createUser,token})
    } catch (error) {
      res.status(400).json({error:error.message})  
    }
}


const Login = async (req, res)=>{
    try {
         const {mobile, password} = req.body
         const findMobile = await userModels.findOne({mobile})
         if(!findMobile) {
            return res.status(400).json({message:"This Mobile Number Already Used"})
         }
         const passwordCheck = await bcrypt.compare(password, userModels.password)
         if(!passwordCheck){
            res.status(400).json({message:"your password is incorrect"})
         }

         const token = await jwt.sign(
            {id: createUser.id},
            process.env.JWT_SECRET,
            {expiresIn:"10d"}
        )

        res.status(200).json({findMobile,token})
        
    } catch (error) {
      res.status(400).json({message:error.message})  
    }
   
}

module.exports = {
    register,
    Login
}