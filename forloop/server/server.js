const express = require("express");
const app = express()
const PORT = 5000
const dataBase = require("./config/db")
dataBase()
app.use(express.json())




app.listen(PORT,()=>{
    console.log("server is running")
})