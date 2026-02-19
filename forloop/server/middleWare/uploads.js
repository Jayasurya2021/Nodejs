const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({

    destination: (req, file, cb)=>{
        cb(null, "../uploads")
    },

    filename: (req, file, cb)=>{
        const extName = path.extname(file.originalname)
        const uniqueFileName = Date.now() + extName;
        cb(null, uniqueFileName)
    }
})

exports.uploads = multer({storage})