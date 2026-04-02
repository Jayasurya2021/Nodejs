import { useState } from "react";
import useFetch from "../customHooks/useFetch"


function ProductsAdd() {
    //from keywords
    const [keyword, SetKeyword] = useState("")
    //from product datas
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        brand: "",
        stock: "",
        keywords: []
    });

    //thumbnail and image 

    const [thumbnail, setThumbnail] = useState(null)
    const [images, setImages] = useState([])

    //preview thumnaill and image

    const [prevThumbnail, setPreThumbnail] = useState(null)
    const [PrevImages, setPrevImages] = useState([])

    // custom hook for fetching
    const { fetchData, data, loading, error } = useFetch()

    //destructer and add the data in state
    function handleChange(e) {
        const { name, value } = e.target
        setProduct({ ...product, [name]: value })
    }

    //keyword add
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
    //remove the keywords
    function removeKeywords(index) {
        setProduct((prev) => ({
            ...prev, keywords: prev.keywords.filter((_, i) => i !== index)

        }))
    }

    //create the newform data and add the thumbnail and image in one single variable
    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData()

        // form data text
        Object.keys(product).forEach(key => {
                formData.append(key, product[key])
        })


        //thumbnail data
        if (thumbnail) {
            formData.append("thumbnail", thumbnail)
        }

        //images data
        if (images > 0) {
            images.forEach(files => {
                formData.append("images", files)
            })
        }

        console.log(formData)

        //fetcing the data
        fetchData("/admin/addproduct", "POST", formData)
        //reset the form data
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
            setImages([])
            setThumbnail(null)
            setPreThumbnail(null)
            setPrevImages([])

        } if (error) {
            console.log(error)
        }

    }

    return (

        <>

<form
  onSubmit={handleSubmit}
  className="max-w-6xl mx-auto bg-white text-black p-8 rounded-2xl shadow-lg space-y-8"
>
  <h2 className="text-3xl font-bold text-center border-b pb-4">
    Add Product
  </h2>

  {/* TOP SECTION */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

    {/* LEFT - THUMBNAIL */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Thumbnail</h3>

      <label className="block border border-gray-300 rounded-xl p-4 cursor-pointer hover:border-black transition">
        <input
          type="file"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files[0]
            setThumbnail(file)
            setPreThumbnail(URL.createObjectURL(file))
          }}
        />

        {prevThumbnail ? (
          <img
            src={prevThumbnail}
            className="w-full h-64 object-cover rounded-xl"
          />
        ) : (
          <div className="h-64 flex items-center justify-center text-gray-400">
            Upload Thumbnail
          </div>
        )}
      </label>
    </div>

    {/* RIGHT - IMAGES */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Product Images</h3>

      <label className="block border border-gray-300 rounded-xl p-4 cursor-pointer hover:border-black transition">
        <input
          type="file"
          multiple
          className="hidden"
          onChange={(e) => {
            const files = Array.from(e.target.files)
            setImages(files)

            const previews = files.map(file =>
              URL.createObjectURL(file)
            )
            setPrevImages(previews)
          }}
        />

        <div className="text-center text-gray-500">
          Upload Images
        </div>
      </label>

      {/* Preview grid */}
      <div className="grid grid-cols-3 gap-3">
        {PrevImages.map((img, i) => (
          <img
            key={i}
            src={img}
            className="w-full h-24 object-cover rounded-lg border"
          />
        ))}
      </div>
    </div>
  </div>

  {/* FORM */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    <input
      type="text"
      name="name"
      placeholder="Product Name"
      value={product.name}
      onChange={handleChange}
      className="border border-gray-300 p-3 rounded-lg focus:border-black outline-none"
    />

    <input
      type="number"
      name="price"
      placeholder="Price"
      value={product.price}
      onChange={handleChange}
      className="border border-gray-300 p-3 rounded-lg focus:border-black outline-none"
    />

    <input
      type="text"
      name="brand"
      placeholder="Brand"
      value={product.brand}
      onChange={handleChange}
      className="border border-gray-300 p-3 rounded-lg focus:border-black outline-none"
    />

    <input
      type="number"
      name="stock"
      placeholder="Stock"
      value={product.stock}
      onChange={handleChange}
      className="border border-gray-300 p-3 rounded-lg focus:border-black outline-none"
    />

    <select
      name="category"
      value={product.category}
      onChange={handleChange}
      className="border border-gray-300 p-3 rounded-lg focus:border-black outline-none"
    >
      <option value="">Select Category</option>
      <option value="tshirt">T-Shirt</option>
      <option value="shirt">Shirt</option>
      <option value="jeans">Jeans</option>
    </select>

    <textarea
      name="description"
      placeholder="Description"
      value={product.description}
      onChange={handleChange}
      className="border border-gray-300 p-3 rounded-lg focus:border-black outline-none md:col-span-2"
    />
  </div>

  {/* KEYWORDS */}
  <div className="space-y-3">
    <div className="flex gap-3">
      <input
        type="text"
        placeholder="Add keyword"
        value={keyword}
        onChange={(e) => SetKeyword(e.target.value)}
        className="border border-gray-300 p-3 rounded-lg w-full focus:border-black outline-none"
      />

      <button
        type="button"
        onClick={Addkeyword}
        className="bg-black text-white px-4 rounded-lg hover:bg-gray-800"
      >
        Add
      </button>
    </div>

    {/* KEYWORD LIST */}
    <div className="flex flex-wrap gap-2">
      {product.keywords.map((k, i) => (
        <div
          key={i}
          className="flex items-center gap-2 border px-3 py-1 rounded-full text-sm"
        >
          {k}

          {/* REMOVE BUTTON */}
          <button
            type="button"
            onClick={() => removeKeywords(i)}
            className="text-red-500 hover:text-red-700 font-bold"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  </div>

  {/* SUBMIT */}
  <button
    type="submit"
    className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
  >
    {loading ? "Loading..." : "Add Product"}
  </button>
</form>
        </>
    );
}

export default ProductsAdd
