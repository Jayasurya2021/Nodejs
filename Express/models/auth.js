const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Registerdata = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },    
},{ timestamps: true }
)

Registerdata.pre("save",async function (next) {
    if(!this.isModified("password")){
       return next()
    }
    this.password = await bcrypt.hash(this.password, 10)
    next()

})

const authdata = mongoose.model("authdatas", Registerdata)

module.exports = {
    authdata
}