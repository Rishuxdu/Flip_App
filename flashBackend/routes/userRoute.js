const express = require("express")
const router = express.Router()
const  {User} = require("../userSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
 const {authMiddleware,generateToken}=require("../authmiddleware")



router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body
  const existingUser = await User.findOne({ email:email })
  if (existingUser) {return res.status(409).json({ message: "You are already registered! Please login." })}
  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = new User({ username, email, password: hashedPassword })
   const SavedUser= await newUser.save()
  const generatedToken=generateToken(SavedUser)
  
  res.json({RegisterdUser:SavedUser,message:"user created", token:generatedToken})
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user){return res.status(401).json({ message: "Invalid Email" })} 
  const match = await bcrypt.compare(password, user.password)
  if (!match) {return res.status(401).json({ message: "Invalid Password" })}
  
 const generatedToken=generateToken(user)
 res.json({message:"login Successful backend", token :generatedToken})
})
router.get("/users",async (req,res)=>{
 const users= await User.find()
res.json(users)
})

module.exports = router

