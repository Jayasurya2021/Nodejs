const express = require("express")
const AdminRoute = express.Router()
const AddProduct = require("../controller/AddProduct")
const { uploads } = require("../Middleware/ImageMiddleware")

AdminRoute.post("/addproduct", uploads.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 5 }
]), AddProduct)

module.exports = AdminRoute