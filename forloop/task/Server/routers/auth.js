const express = require("express")
const route = express.Router()
const {register, login} = require("../controller/Authontaction")
const {userCheck} = require("../middelware/userMiddelware")
const userModels = require("../models/userModels")

route.post("/register", register)
route.post("/login", login)
route.get("/userdata", userCheck, async (req, res)=>{
   const userData = req.user.email
   console.log(userData)
   const findEmail = await userModels.findOne({email: userData})
    res.status(200).json({message:"user login succesful", userDatas : findEmail.name })
    console.log(findEmail.name)
})

module.exports = route