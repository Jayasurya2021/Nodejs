import { useState } from "react";
import useFetch from "../customHooks/useFetch"

function ProductsAdd() {

    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        brand: "",
        stock: "",
        keywords: ""
    });

    function handleChange(e) {
        const { name, value } = e.target
        setProduct({ ...product, [name]: value })
    }


    function handleSubmit(e) {
        e.preventDafault();
        const { datas, loading, error } = useFetch("http://localhost:5000/api/products", product)
        

    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>

            <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={product.name}
                onChange={handleChange}
                required
            />

            <textarea
                name="description"
                placeholder="Description"
                value={product.description}
                onChange={handleChange}
                required
            />

            <input
                type="number"
                name="price"
                placeholder="Price"
                value={product.price}
                onChange={handleChange}
                required
            />

            <select
                name="category"
                value={product.category}
                onChange={handleChange}
                required
            >
                <option value="">Select Category</option>
                <option value="tshirt">T-Shirt</option>
                <option value="shirt">Shirt</option>
                <option value="jeans">Jeans</option>
                <option value="pants">Pants</option>
                <option value="shorts">Shorts</option>
                <option value="hoodie">Hoodie</option>
                <option value="jacket">Jacket</option>
                <option value="blazer">Blazer</option>
                <option value="suit">Suit</option>
                <option value="kurta">Kurta</option>
                <option value="sherwani">Sherwani</option>
                <option value="trackpants">Trackpants</option>
                <option value="sweatshirt">Sweatshirt</option>
                <option value="innerwear">Innerwear</option>
                <option value="socks">Socks</option>
                <option value="Others">Others</option>
            </select>

            <input
                type="text"
                name="brand"
                placeholder="Brand"
                value={product.brand}
                onChange={handleChange}
            />

            <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={product.stock}
                onChange={handleChange}
                required
            />

            <input
                type="text"
                name="keywords"
                placeholder="keywords (comma separated)"
                value={product.keywords}
                onChange={handleChange}
            />

            <button type="submit">{loading ? "Loading..." : "Add Product"}</button>

        </form>
    );
}

export default ProductsAdd
