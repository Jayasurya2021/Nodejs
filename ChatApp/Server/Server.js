const express = require("express");
const app = express()
const PORT = 5000
const route =require("./routes/Auth")
const database = require("./config/db")
database()


app.use("auth",route)


app.listen(PORT,()=>{
    console.log("server is running")
})