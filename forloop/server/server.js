const express = require("express");
const app = express()
const {MongoClient} = require("mongodb")
const cors = require("cors")
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))

const client = new MongoClient("mongodb://localhost:27017/testdata")

app.post("/register", async (req, res)=>{
    const {name, email, password} = req.body
    await client.connect();
    const db = client.db("mydata")
    const result = await db.collection("user").insertOne({name, email, password})
    res.status(200).json(result)
    console.log(result)
})

app.listen(5000,()=>{
    console.log("server is running")
})