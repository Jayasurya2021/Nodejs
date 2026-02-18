// Create an object student with name, age, and grade. Print all values. 


const students = { name: "surya", age: "24", grade: "A" }
console.log(students.name)
console.log(students.age)
console.log(students.grade)

// Create an object car with brand, model, year. Print only the brand. 

const cars = { brand: "BMW", model: "m4", year: 2024 }
console.log(cars.brand)

// Create an object mobile with 3 properties and add one new property later.

const mobile = { brand: "samsung", model: "s25", year: "2025" }
const addMobile = { ...mobile, price: "1L" }
console.log(addMobile)

//  Create a book object and change its price property to a new value. 

const book = { brand: "book", author: "gandhi", publish: "2025", price: "75k" }
const addBook = { ...mobile, price: "80k" }
console.log(addBook)

// Create an object employee and check if the key "salary" exists using in operator.

const employee = { name: "parthiban", age: "21", salary: "25000" }
if (employee.salary) {
    console.log("yes salary is exist")
} else {
    console.log("salary is not add")
}

// Create an object product and delete the discount property using delete.

const discount = { productName: "mobile", price: "25k", productDiscount: "25%" }
if (discount.productDiscount) {
    delete discount.productDiscount
    console.log(discount)
}

// Create an object user with name and email. Print all keys using for…in loop.

const users = [{ name: "soundher", email: "soundher@gmail.com" }, { name: "parthiban", email: "pathi@gmail.com" }]
users.map((e) => (
    console.log(e.name)
))

for (let i = 0; i < users.length; i++) {
    console.log(users[i].name)
}

// Create an object dog with breed and age. Print "Puppy" if age < 2. 

const dog = { breed: "rajapaliyam", age: 2 }
if (dog.age <= 2) {
    console.log("puppy")

}

// Create an object calculator with two numbers and print their sum. 

const num = { num1: 25, num2: 26 }
let sum = num.num1 * num.num2

console.log(sum)

// Create an object person with firstName and lastName. Print full name. 
const names = {firstName:"siva", lastName: "karthi"}
console.log(names.firstName+names.lastName)

// Create an object marks with 5 subject marks. Find the total using loop.

const marks = {tamil: 49, english:  29, maths: 20, science: 45, socialScience: 80}



