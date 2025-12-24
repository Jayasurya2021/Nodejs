const mongoose = require('mongoose')

const datas = mongoose.Schema({
   name:{
      type:String,
      required:true
   },
   age:{
      type:Number,
      required:true
   }
},
{ timestamps: true }
)

const userData = mongoose.model("datas",datas)

module.exports = userData