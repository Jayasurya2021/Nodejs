// Write a Node.js program to create a JSON file and save an object with your name and age.

const fs = require("fs");
const data = { name: "surya", age: 26 }
fs.writeFile("./createJsonFile.json", JSON.stringify(data), (err) => {
    if (!err) {
        console.log("json File is created")
    }
    console.error(err)
})

// Write a Node.js program to read a folder and list all files inside it.

fs.readdir("./test",(err, files)=>{
    if(err){
        console.log(err)
    }
    files.map((files)=>(
        console.log(files)
    ))
})

// Write a Node.js program to implement a simple counter that increments every second and prints the value.

let count = 0

setInterval(()=>{
    count++;
    console.log(count)
},1000) 


// Write a Node.js program to make an HTTP GET request to
//  https://jsonplaceholder.typicode.com/posts and print the first post’s title.

const https = require("https");

https.get("https://jsonplaceholder.typicode.com/posts",(res)=>{
    res.on(datas=>{
        console.log(datas.title)
    })

})