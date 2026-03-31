const express = require("express")
const app = express()
const PORT = 5000
const DB = require("./config/database")
const routes = require("./router/routes")
app.use(express.json())
DB()

app.use("/user",routes)


app.listen(PORT,()=>{
    console.log("server is running")
})