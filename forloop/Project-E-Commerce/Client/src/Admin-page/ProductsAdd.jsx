import { useState } from "react";
import useFetch from "../customHooks/useFetch"

function ProductsAdd() {
    const [keyword, SetKeyword] = useState("")
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        brand: "",
        stock: "",
        keywords: []
    });
    const { fetchData, data, loading, error } = useFetch()

    function handleChange(e) {
        const { name, value } = e.target
        setProduct({ ...product, [name]: value })
    }
    function Addkeyword() {
        if (keyword.length !== 0) {
            setProduct((prev) => ({
                ...prev,
                keywords: [...prev.keywords, keyword]

            }))
            SetKeyword("")
            console.log(product)
        }



    }
    function removeKeywords(index) {
        setProduct((prev) => ({
            ...prev, keywords: prev.keywords.filter((_, i) => i !== index)
        }))
    }
    function handleSubmit(e) {
        e.preventDefault();
        fetchData("http://localhost:5000/admin/addproduct", "POST", product)

        if (data) {
            console.log(data)
            setProduct({
                name: "",
                description: "",
                price: "",
                category: "",
                brand: "",
                stock: "",
                keywords: []
            })

        } if (error) {
            console.log(error)
        }

    }

    return (

        <>

            <form
                onSubmit={handleSubmit}
                className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg space-y-5"
            >
                <h2 className="text-2xl font-bold text-center">Add Product</h2>

                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={product.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={product.description}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={product.price}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                />

                {/* Scroll category */}
                <div className="flex flex-col">
                    <label className="font-medium mb-1">Category</label>

                    <select
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
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
                        <option value="others">Others</option>
                    </select>
                </div>

                <input
                    type="text"
                    name="brand"
                    placeholder="Brand"
                    value={product.brand}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                />

                <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    value={product.stock}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                />

                {/* keyword add input */}
                <input
                    type="text"
                    name="keywords"
                    placeholder="Keywords (comma separated)"
                    value={keyword}
                    onChange={(e) => SetKeyword(e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                />

                {/* keyword add button */}
                <div className="flex gap-3 mt-3">

                    <button
                        type="button"
                        onClick={Addkeyword}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Add Keyword
                    </button>

                </div>

                {/* keyword map the all elements */}
                <div className="flex flex-wrap gap-2 mt-4">
                    {product.keywords.length > 0 &&
                        product.keywords.map((e, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                            >
                                {e}
                                {/* kewords remove */}
                                <button
                                    type="button"
                                    onClick={() => removeKeywords(i)}
                                    className="text-red-500 font-bold hover:text-red-700"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
                >
                    {loading ? "Loading..." : "Add Product"}
                </button>
            </form>
        </>
    );
}

export default ProductsAdd
