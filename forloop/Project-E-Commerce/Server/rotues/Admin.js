const express = require("express")
const AdminRoute = express.Router()
const AddProduct = require("../controller/AddProduct")
const {uploads} = require("../Middleware/ImageMiddleware")

AdminRoute.post("/addproduct", AddProduct)
AdminRoute.post("/uploads", uploads.single("image"),(req, res)=>{
    res.status(200).json({message: "img upload succesfull"})
})

module.exports = AdminRoute