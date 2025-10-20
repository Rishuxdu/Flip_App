const mongoose=require( "mongoose")
 const cardSchema= new mongoose.Schema({
question:{
    type:String,
    required:true,

},
answer:{
    type:String,
    required:true,
    
},
subjectId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"subject"
   
},

    userId: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: "User", 
         required: true
         } 

})


module.exports=cardSchema