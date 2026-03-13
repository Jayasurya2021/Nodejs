const ProductModel = require("../models/ProductModel")

async function AddProduct(req, res) {
    try {
        const data = req.body
        const AddProduct = await ProductModel.create(data)
        res.status(200).json({ message: AddProduct })
        console.log(AddProduct)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

module.exports = AddProduct