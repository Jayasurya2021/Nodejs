const express = require("express")
const mongoDB = require("./config/db")
const AdminRoute = require("./rotues/Admin")
const ClientRoute = require("./rotues/Client")
const cors = require("cors")
require("dotenv").config()
const app = express()
mongoDB()

app.use(express.json())
app.use(cors({
    origin: process.env.FRONT_END_URL
}))

app.use("/admin", AdminRoute)
app.use("/client", ClientRoute)

app.listen(5000, () => {
    console.log("server is running")
})