// Task 4: Calculate Total Cart Amount (reduce()) const cart = [ { product: "Laptop", price: 50000 },
//  { product: "Mouse", price: 500 }, { product: "Keyboard", price: 1500 } ]; Task: Calculate the total cart value.
//  Display the final amount. Interview Focus: reduce()


const cart = [
    { product: "Laptop", price: 50000 },
    { product: "Mouse", price: 500 },
    { product: "Keyboard", price: 1500 }
];

const totalAmount = cart.reduce((acc, curr) => acc + curr.price, 0)

console.log(totalAmount)