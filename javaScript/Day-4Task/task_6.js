// Bonus Company-Level Task const orders = [ { id: 1, customer: "John", amount: 5000, status: "Completed" },
//  { id: 2, customer: "David", amount: 3000, status: "Pending" },
//  { id: 3, customer: "Sam", amount: 7000, status: "Completed" },
//  { id: 4, customer: "Peter", amount: 2000, status: "Pending" } ];
//  Tasks: Display all orders (map) Display completed orders (filter) 
// Find order id = 3 (find) Calculate total revenue (reduce)

const orders = [{ id: 1, customer: "John", amount: 5000, status: "Completed" },
{ id: 2, customer: "David", amount: 3000, status: "Pending" },
{ id: 3, customer: "Sam", amount: 7000, status: "Completed" },
{ id: 4, customer: "Peter", amount: 2000, status: "Pending" }];

// Display all orders (map)
console.log("Display all orders ")
orders.map((e) => {
    console.log(`customer: ${e.customer} amount: ${e.amount} status : ${e.status}`)
})


// Display completed orders (filter)
console.log("Display completed orders")

const filterorders = orders.filter((e) => e.status === "Completed")

filterorders.map((e) => {
    console.log(`customer: ${e.customer} status: ${e.status}`)
})

// Find order id = 3 (find)

const findorders = orders.find((e) => e.id === 3)

console.log(findorders)

// Calculate total revenue (reduce)

const totalorders = orders.reduce((acc, curr) => acc + curr.amount, 0)

console.log(totalorders)


