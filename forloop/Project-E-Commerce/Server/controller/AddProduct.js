const ProductModel = require("../models/ProductModel")

function AddProduct(req, res) {
    const data = req.body
    const AddProduct = ProductModel.create({data})
}

module.exports = AddProduct