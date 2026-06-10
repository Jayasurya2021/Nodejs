import React, { useEffect, useState } from 'react'

const SearchProducts = () => {
    const [products, setProducts] = useState([])
    const [search, setSearch] = useState("")

    const product = [
        {
            id: 1,
            name: "Laptop",
            price: 55000,
            category: "Electronics"
        },
        {
            id: 2,
            name: "Smartphone",
            price: 25000,
            category: "Electronics"
        },
        {
            id: 3,
            name: "Headphones",
            price: 2000,
            category: "Accessories"
        },
        {
            id: 4,
            name: "Keyboard",
            price: 1500,
            category: "Accessories"
        },
        {
            id: 5,
            name: "Mouse",
            price: 800,
            category: "Accessories"
        },
        {
            id: 6,
            name: "Monitor",
            price: 12000,
            category: "Electronics"
        },
        {
            id: 7,
            name: "Smart Watch",
            price: 5000,
            category: "Wearables"
        },
        {
            id: 8,
            name: "Bluetooth Speaker",
            price: 3000,
            category: "Audio"
        },
        {
            id: 9,
            name: "Power Bank",
            price: 1200,
            category: "Accessories"
        },
        {
            id: 10,
            name: "Tablet",
            price: 18000,
            category: "Electronics"
        }
    ];

    useEffect(() => {
        console.log(search)
        const searchProducts = product.filter(
            (e) => e.name.toLowerCase() === search.toLowerCase()
        )
        setProducts(searchProducts)
    }, [search])

    return (
        <div>

            <div>
                <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder='search Products' />
            </div>

            {products.length === 0 ? "No Products Found" : products.map((e, i) => (
                <div key={i} style={{ width: "150px", height: "200px", backgroundColor: "lightblue" }}>
                    <h5>{e.name}</h5>
                    <h5>{e.price}</h5>
                    <h5>{e.category}</h5>
                </div>
            ))}
        </div>
    )
}

export default SearchProducts
