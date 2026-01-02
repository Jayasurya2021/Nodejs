const express = require('express');
const getdata = require('./routers/get_data')
// const auth = require('./routers/auth')
const app = express()
const port = 5000
const dataBase = require('./config/db')
const authdatas = require('./routers/authdatas')
const auth = require('./routers/Auth')
// const userData = require('./models/User')
dataBase()
app.use(express.json())
// app.get('/test', (req, res) => {
//    console.log(req.students)
//     res.send("Test route working")
// })

// app.post('/postdata', (req, res) => {
//     try {
//         console.log(req.body)
//     } catch (error) {
//         res.statusCode(400).json({ error: error.message })
//     }
// })

app.use('/user',getdata);
app.use('/authdata',authdatas);
app.use('/auth',auth);

// app.post("/surya", async (req, res) => {
//     try {
//         const user = await userData.create(req.body)
//         res.status(200).json(user)
//     } catch (error) {
//         res.status(400).json({ error: error.message })
//     }
// })

// app.get("/gets",async (req, res)=>{
//     try {
//        const datas =  await userData.find({})
//        res.status(200).json(datas)
//     } catch (error) {
//         res.status(500).json({error: error.message})
//     }
// })

// app.get("/gets/:id",async (req, res)=>{
        
//         try {
//             const {id} = req.params
//             const datas = await userData.findById(id)
//             res.status(200).json(datas)
//         } catch (error) {
//             res.status(400),json({error: error.message})
//         }
// })

// app.put("/gets/:id",async(req, res)=>{
//     try {
//         const {id} = req.params
//         const datas = await userData.findByIdAndUpdate(id, req.body)
//         if (!datas) {
//            return res.status(404).json({message: "id is not deffine" }) 
//         }
//         const update = await userData.findById(id)
//         res.status(400).json(update)
//     } catch (error) {
//         res.status(500).json({error: error.message})
//     }
// })

// app.delete("/gets/:id",async(req,res)=>{
//     try {
//         const {id} = req.params
//         const datas = await userData.findByIdAndDelete(id)
//         if(!datas){
//             res.status(404).json({message: "data is removed"})
//         }
//         await userData.findById(id)
//         res.status(400).json({message: "Data is deleted"})

//     } catch (error) {
        
//     }
// })


// app.use('/adddata',getdata)
// app.use('/users',getdata)

app.listen(port, () => {
    console.log("server is running")
})