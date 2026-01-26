const express = require("express");
const app = express()
const PORT = 5000
const route =require("./routes/Auth")
const database = require("./config/db")
require('dotenv').config();
database()
app.use(express.json())



app.use("/auth",route)


app.listen(PORT,()=>{
    console.log("server is running")
})