const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const datas = mongoose.Schema({
   name:{
      type:String,
      required:true
   },
   
   password:{
      type:String,
      required: true
   },
   email:{
      type:String,
      required : true
   }
},
{ timestamps: true }
)

datas.pre("save",async function(next) {

   if(!this.isModified("password")){
      return next()
   }

   this.password =  await bcrypt.hash(this.password, 10)
   next()
})

const userData = mongoose.model("datas",datas)

module.exports = userData