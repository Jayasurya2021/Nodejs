const user = require('../models/User')

const postData = async (req, res) =>{
    try {
        const data = user.create(req.body)
        res.status(400),json(data)
    } catch (error) {
        res.status(500).json({error: errror.message})
    }
}


module.exports = {
    postData
}