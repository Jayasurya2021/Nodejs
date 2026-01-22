const userModels = require ("../models/userData")

const register = async (req, res)=>{
    try {
        const {userName, name, email, mobile, password} = req.body
        const findEmailId = userModels.findOne({email})
        const findMobile = userModels.findOne({mobile})
        if(findEmailId){
           return req.status(201).json({message:"this email id already used"})
        }
        if(findMobile){
           return req.status(201).json({message:"this mobile number already used"})
        }
        
        
    } catch (error) {
        
    }
}