const mongoose=require("mongoose")
const { db } = require("./db")
 const subjectSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
       
    },
 
      userId: { 
          type: mongoose.Schema.Types.ObjectId,
           ref: "User", 
           required: true
          } 
})
subjectSchema.index({ name: 1, userId: 1 }, { unique: true })
const Subject=mongoose.model("subject",subjectSchema)

module.exports={Subject,subjectSchema}