const {user} = require('../models/User')

const postData = async (req, res) =>{
    try {
        const data = await user.create(req.body)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const getData = async (req, res)=>{
    
    const {id} = req.params
    try{
        // const {email} = req.body
        const findid = await user.findById(id)
        if (!findid) {
            console.log("creater not in database")
        }
        res.status(200).json(findid)
    }catch(error){
        res.status(400).json({error: error.message})
    }

}


module.exports = {
    postData,
    getData
}