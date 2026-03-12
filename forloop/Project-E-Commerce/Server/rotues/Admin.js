const express = require("express")
const route = express.Router;
const AddProduct = require("../controller/AddProduct")

route.post("/addproduct", AddProduct)

module.exports = route