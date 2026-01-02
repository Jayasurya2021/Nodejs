const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const userModule = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    }
},{timestamps: true})

userModule.pre("save", async function (next) {
    if(!this.isModified("password")){
        return next()
    }

    this.password = await bcrypt.hash(this.password, 10)
    next()


    
})


const userData = mongoose.model('NewData',userModule)

module.exports = {
    userData
}
