import React, { useState } from 'react'

const ProductPrice = () => {

    const [productName, setProductName] = useState("")
    const [productPrice, setProductPrice] = useState("")
    const [submit, setSubmit] = useState(true)



    function HandleSubmit(e) {
        e.preventDefault()
        setSubmit(false)
    }
    return (
        <div>
            <form onSubmit={HandleSubmit}>
                <input type="text" placeholder='product name' value={productName} onChange={(e) => setProductName(e.target.value)} />
                <input type="text" placeholder='product price' value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
                <button>submit</button>
                {submit ? " " :
                    <div>
                        <h1>bill</h1>
                        <h5>prodcut name : {productName}</h5>
                        <h5>prodcut price : {productPrice < 5000 ? productPrice : productPrice- 500}</h5>

                    </div>


                }
            </form>

        </div>
    )
}

export default ProductPrice
