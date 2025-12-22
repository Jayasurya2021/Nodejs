const express = require('express');
// const getdata = require('./routers/get_data')
// const auth = require('./routers/auth')
const app = express()
const port = 5000
const dataBase = require('./config/db')
dataBase()

app.use(express.json())
app.get('/test',(req,res)=>{
   console.log(req.students)
})

app.post('/postdata', async(req, res)=>{
    try {
        await console.log(req.body)
    } catch (error) {
        res.statusCode(400).json({ error: error.message })
    }
    

})

app.get("surya", async(req,res)=>{
    res.send("nodejs")
    try {
        console.log(res.body)
    } catch (error) {
        res.statusCode(400).json({error: error.message})
    }
})



// app.use('/users',getdata)

app.listen(port,()=>{
    console.log("server is running")
})