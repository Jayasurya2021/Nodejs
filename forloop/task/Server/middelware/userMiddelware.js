const jwt = require("jsonwebtoken")

const userCheck = async (req, res, next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader){
        res.status(400).json({message: "token invalied"})
    }
    const token = authHeader.split("")[1];

    jwt.verify(so0ismok)

}