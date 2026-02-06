const jwt = require("jsonwebtoken");

const userCheck = async (req, res, next)=>{

    const authHeader = await req.headers.authorization;

    if(!authHeader){
        res.status(400).json({message: "no token "})
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token,"secreateKey1234",(error, decoded)=>{
        if(error){
            res.status(400).json({message: error.message})
        }
        req.user = decoded
        console.log("token is verified")
        next()
    } )

}
module.exports = userCheck