const express = require("express")
const router = express.Router()
const { Card } = require("../db")
const {authMiddleware} = require("../authmiddleware")



router.get("/default", async (req, res) => {
  const defaultCards = [
    {
      _id: "default1",
      question: "Welcome!",
      answer: "Create your first subject to begin.",isDefault:true
    },
    {
      _id: "default2",
      question: "Example Card",
      answer: "Tap to flip and add your own!",isDefault:true
    }
  ];
  return res.json(defaultCards);
});



router.get("/:subjectId",authMiddleware, async (req, res) => {
  const {subjectId}=req.params
  const userId = req.userPayload.id
  const cards = await Card.find({subjectId:subjectId,userId:userId})
  if(!cards) {return res.json("no card found")}
  res.json(cards)
})


router.post("/:subjectId",authMiddleware, async (req, res) => {
  const { question, answer } = req.body
  const {subjectId}=req.params
  const userId = req.userPayload.id
  if(!question || !answer){return res.json({message:"both required"})}
  const newData = new Card({ question, answer, subjectId,userId })
  await newData.save()
  res.json(newData)
})

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedOne = await Card.findOneAndDelete({
      _id: req.params.id,
      userId: req.userPayload.id
    });

    if (!deletedOne) {
      return res.status(404).json({ message: "Card not found or not yours" });
    }

    res.json({ message: "Card deleted", card: deletedOne });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router

