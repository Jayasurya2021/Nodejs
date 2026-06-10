
//passing the aurgument to the parementer
function evenOrOdd(num) {
    if (num % 2 === 0) {
        console.log("even Number")
    } else {
        console.log("odd Number")
    }

}

evenOrOdd(1)

//callback Function

function one(a, b) {
    two(a, b)

}

function two(a, b) {

    console.log(a + b)
}
one(2, 5)



//array data show in map method

let arry = ["apple", "banana", "pinapple"]

arry.map((e) => {
    console.log(e)
})

// foreach method

arry.forEach((e) => {
    console.log(e)
})

//forloop method

for (let i = 0; i <= arry.length - 1; i++) {
    console.log(arry[i])
}


// clouser function

function outer() {

    let data = "datas"

    inner()

    console.log(`outer- ${data}`)

    function inner() {
        console.log(`inner- ${data}`)
    }


}

outer()

// forin use

let obj = { name: "surya", age: "24" }

for(let key in obj){
    console.log(`${key}: ${obj[key]}`)
}

