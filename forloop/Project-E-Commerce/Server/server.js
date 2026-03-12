const express = require("express")
const mongoDB = require("./config/db")
const route = require("./rotues/Admin")
const app = express()
mongoDB()

app.use(express.json())
app.use("/admin", route)

app.listen(() => {
    console.log("server is running")
})