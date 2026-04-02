const ProductModel = require("../models/ProductModel")

async function AddProduct(req, res) {
    try {
        const thumbnail = req.files["thumbnail"]?.[0]?.filename
        const images = req.files["images"]?.map(file => file.filename)
        const data = req.body
        const productData = {
            ...data,
            thumbnail,
            images
        }
        const AddProduct = await ProductModel.create(productData)

        res.status(200).json({
            message: "product add sucessfully",
            product: AddProduct
        })
        console.log(AddProduct)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

module.exports = AddProduct