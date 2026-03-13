const express = require("express")
const mongoDB = require("./config/db")
const route = require("./rotues/Admin")
const cors = require("cors")
require("dotenv").config()
const app = express()
mongoDB()

app.use(express.json())
app.use(cors({
    origin: process.env.FRONT_END_URL
}))
app.use("/admin", route)

app.listen(5000, () => {
    console.log("server is running")
})