const express = require("express")
const mongoDB = require("./config/db")
const cors = require("cors")
const app = express()
mongoDB()
app.use(express.json())


app.listen(()=>{
    console.log("server is running")
})