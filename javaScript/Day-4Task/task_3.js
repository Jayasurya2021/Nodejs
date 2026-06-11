// Task 3: Product Card Rendering (map()) const products = 
// [ { id: 1, name: "Laptop", price: 50000 }, { id: 2, name: "Mobile", price: 20000 },
//  { id: 3, name: "Keyboard", price: 1500 } ]; Task: Display all products in separate cards.
//  Show Product Name and Price. Interview Focus: map()


const productCard = document.getElementById("productCard");
const products = [
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Mobile", price: 20000 },
    { id: 3, name: "Keyboard", price: 1500 }
];


    productCard.innerHTML =
    products.map((e) => ( `
    <div style="width: 150px; height: 200px; background-color: aqua;">
        <h5>
        ${e.name}
        </h5>
        <h4>
         ${e.price}   
        </h4>
    </div>`
))

products.map((e, i )=>(

    console.log(e.name)
))


