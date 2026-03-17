const express = require("express")
const AdminRoute = express.Router()
const AddProduct = require("../controller/AddProduct")

AdminRoute.post("/addproduct", AddProduct)

module.exports = AdminRoute