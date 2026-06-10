import React, { useState } from 'react'

const ProductPrice = () => {

    const [productName, setProductName] = useState("")
    const [productPrice, setProductPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [total, setTotal] = useState(0)
    const [submit, setSubmit] = useState(true)



    function HandleSubmit(e) {
        e.preventDefault()
      const billAmount = productPrice * quantity
        setTotal(billAmount)
        setSubmit(false)
    }
    return (
        <div>
            <form onSubmit={HandleSubmit}>
                <input type="text" placeholder='product name' value={productName} onChange={(e) => setProductName(e.target.value)} />

                <input type="number" placeholder='product price' value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
                <input type="number" placeholder='quantity' onChange={(e) => setQuantity(e.target.value)} />
                <button type='submit'>submit</button>
                {submit ? " " :
                    <div>
                        <h1>bill</h1>
                        <h5>prodcut name : {productName}</h5>
                        <h6>purchace above 5000 get 500 discount</h6>
                        <h5>prodcut price : {total < 5000 ? total : total - 500} </h5>

                    </div>


                }
            </form>

        </div>
    )
}

export default ProductPrice
