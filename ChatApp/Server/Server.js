const express = require("express");
const app = express()
const PORT = 5000
const route =require("./routes/Auth")
const database = require("./config/db")
const cors = require("cors")
require('dotenv').config();
database()
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))



app.use("/auth",route)


app.listen(PORT,()=>{
    console.log("server is running")
})