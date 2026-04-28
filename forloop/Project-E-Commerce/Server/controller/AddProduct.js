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
            data: AddProduct
        })
        console.log(AddProduct)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

async function GetProduct(req, res) {
    try {
        async function ProductGet() {



            const product = await ProductModel.find()
            let index = 0
            return new Readable({
                read() {
                    if (index <= product.length) {
                        this.push(JSON.stringify(product[index]+ "\n"));
                        index++
                    } else {
                        this.push(null)
                    }
                }
            })


        }

        res.setHeader("Content-Type", "application/json");
        const stream = ProductGet(); // imagine stream

        stream.on("data", (chunk) => {
            res.write(JSON.stringify(chunk));
        });

        stream.on("end", () => {
            res.end();
        });
    } catch (error) {

    }


}

module.exports = {
    AddProduct,
    GetProduct
}