const express = require("express")
const app = express()
const PORT = 5000
const cors = require("cors")
const DB = require("./config/db")
const route = require("./routers/auth")
DB()
app.use(express.json())
app.use(cors())
app.use("/auth", route)

app.listen(PORT,()=>{
    console.log("server is running")
})