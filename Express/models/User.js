const mongoose = require('mongoose')

const datas = mongoose.Schema({
   name:{
      type:String,
      require:true
   },
   age:{
      type:Number,
      require:true
   }
})

const userData = mongoose.model("students",datas)

module.exports = userData