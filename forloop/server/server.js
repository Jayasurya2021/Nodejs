const express = require("express");
const app = express()
const PORT = 5000
const dataBase = require("./config/db")
const uploads = require("./middleWare/uploads")
dataBase()
app.use(express.json())

app.post("/uploads/files", uploads.single("files"),(req, res)=>{
    return res.status(200).json({message:`file upoads ${req.file}`})
})




app.listen(PORT,()=>{
    console.log("server is running")
})