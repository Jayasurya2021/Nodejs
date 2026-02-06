const express =  require("express")
const app = express()
const port = 5000
const db = require("./config/db")
const route = require("./router/Auth")
app.use(express.json())
db()

app.use("/auth", route)


app.listen(port, ()=>{
    console.log("server is running")
})