const express = require("express")

const app = express()
// Write an Express app to return JSON response.
app.use(express.json())


// Write an Express app with one GET and one POST API.
app.get("/getdata", (req, res)=>{
    res.end("geting data successfull")
})

app.post("/postdata", (req, res)=>{
    res.end("posting data successfull")
})

// Write a program to handle route parameters in Express.


app.listen(5000,()=>{
    console.log("server is running")
})