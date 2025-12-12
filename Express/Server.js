const express = require('express');
const getdata = require('./routers/get_data')
const app = express()
const port = 5000
app.use(express.json())
app.get('/test',(req,res)=>{
    res.json(
        {
            name:"surya",
            age : 24
        }
    )
})

app.use('/users',getdata)
app.listen(port,()=>{
    console.log("server is running")
})