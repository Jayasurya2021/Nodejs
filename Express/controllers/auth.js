const {authdata} = require('../models/auth')

const postData = async (req, res)=>{
   try { 
    const {name,password,email} = req.body
    const findemail = await authdata.findOne({email})
    
      
    if(findemail){
         
       return res.status(400).json({message: "user already created"})
    }
    const createUser = await authdata.create({
            name,
            password,
            email
        })
    res.status(200).json(createUser)  
    } catch (error) {
       res.status(400).json({message: error.message}) 
    }

}


const getData = async(req, res)=>{
    const {id} = req.params
    try {
        const findid = await authdata.findById(id)
        if (!findid) {
           return res.status(400).json({message: "user not found"}) 
        }

        res.status(200).json(findid)


    } catch (error) {
        res.status(400).json({message: error.message})
    }
}


const updatedata = async (req, res)=>{
    const {id} = req.params
    try {
        const finddata = await authdata.findByIdAndUpdate(id, req.body)
        if(!finddata){
            return res.status(400).json({message: "user not found"})
        }

        const updateData = await authdata.findById(id)
        res.status(200).json(updateData)
        
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}


const delectData = async (req, res)=>{
        const {id} = req.params
        const delectData = await authdata.findByIdAndDelete(id)
        if(delectData){
            return res.status(400).json({message:"user data was delected"})
        }

        res.status(200).json({message:"user data not found"})
}



module.exports = {
    postData,
    getData,
    updatedata,
    delectData
}