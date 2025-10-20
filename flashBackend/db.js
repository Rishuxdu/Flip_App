const mongoose=require("mongoose")
const cardSchema=require("./cards")
const db=mongoose.connect(process.env.MONGO_URI)


const Card= mongoose.model("card",cardSchema)
 

 module.exports={Card,db}
 
 