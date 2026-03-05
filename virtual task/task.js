// printing 1 to 10
for (let i = 1; i <= 10; i++) {
    console.log(i)
}
// even or odd function
function evenOrOdd(num) {

    if (num % 2 === 0) {
        console.log(`this number is even ${num}`)
    } else {
        console.log(`this number is odd ${num}`)
    }
}

evenOrOdd(5)

// reverse a string

// let stringName = "hello"
// let reverceName = ""
// for (let i = 0; i <= stringName.length; i++) {
//     reverceName.
// }

// largest number is array

const array = [2, 4, 7, 3, 70, 68]
let largestNumber = array[0]
let secoundLargestNumber = array[0]
for (let i = 0; i <= array.length; i++) {
    if (largestNumber <= array[i]) {
        secoundLargestNumber = largestNumber
        largestNumber = array[i]
    }
}
console.log(secoundLargestNumber)
// implement a Debounce fuction

// let input = "welcome to the college"

// function change(){
//     input.toUpperCase
//     console.log(input)
// }
// change(input)

