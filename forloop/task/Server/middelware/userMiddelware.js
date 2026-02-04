const jwt = require("jsonwebtoken")

const userCheck = async (req, res, next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader){
        res.status(400).json({message: "token invalied"})
    }
    const token = authHeader.split(" ")[1];

    jwt.verify(token,"secreateKey1234",(error, decoded)=>{
        if(error){
            res.status(400).json({message: error.message})
        }
        req.user = decoded
        console.log("token verification succesfull")
        next();
    })
}

module.exports = {userCheck}