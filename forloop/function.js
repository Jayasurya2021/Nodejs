// Create a function that takes a number and prints whether it’s even or odd. 
function OddOrEven(num) {
    let msg = ""
    if (num % 2 === 0) {
        msg = "this is a even Number"

    } else {
        msg = "this is a odd Number"
    }
    return msg
}

const num1 = OddOrEven(5)
const num2 = OddOrEven(6)
console.log(`this is num 1 ${num1}`)
console.log(`this is num 2 ${num2}`)


// Create a function that takes a number n and uses a loop to find the sum of numbers from 1 to n. 

function sum(n) {
    let value = 0
    for (let i = 1; i <= n; i++) {
        value += i
    }
    return value
}

const nummber1 = sum(3)
console.log(nummber1)

// Write a function that returns the factorial of a number using a for loop. 

function factorial(num) {
    let value = 1
    for (let i = 1; i <= num; i++) {
        value *= i
    }
    console.log(value)

}
factorial(9)

// Write a function that accepts an array and returns the sum of all numbers. 

function sumNumbers(num) {
    let value = 0
    for (let i = 0; i < num.length; i++) {
        value += num[i]
    }
    console.log(value)
}
sumNumbers([2, 3, 2, 4, 3, 54])

// Write a function that uses if-else to find the largest among 3 numbers.

// function zeromovetoend(arr){

//     for(let i =0; i<=arr.length; i++){

//     }
// }

// find the index of 2 elements whoessum equal target

function adds(arry) {
    const target = 5
    for (let i = 0; i <= arry.length; i++) {
        for (let j = 1; j <= arry.length; j++) {
            if (arry[i] + arry[j] === target) {
                console.log(`${i},${j}`)
            }
        }
    }
}

adds([2, 9, 5, 6, 7, 3])


function stringReverce(string) {
    var reverce = ""
    for (let i = string.length - 1; i >= 0; i--) {
        reverce += string[i]
    }
    console.log(reverce)
}

stringReverce("surya")


// function paragraphReverce(para){
//     var reverce = ""
//     for(let i = para.length - 1; i >= 0; i--){
//         if(para === " "){

//         }
//     }
// }

// paragraphReverce("java is easy")
for (let i = 1; i <= 40; i++) {
    let patten = " "
    for (let j = 1; j <= i; j++) {
        patten += `${j},`
    }
    console.log(patten)
}

