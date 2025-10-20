const express = require("express")
const router = express.Router()
const { Subject } = require("../subjectSchema")
const {authMiddleware,generateToken} = require("../authmiddleware")

router.get("/",authMiddleware, async (req, res) => {
 const userId= req.userPayload.id
  const subjects = await Subject.find({userId })
  if(!subjects){return res.send("no subject yet")}
  res.json(subjects)
})


router.post("/", authMiddleware, async (req, res) => {
  const { name } = req.body;
  const userId = req.userPayload.id;

  if (!name) {
    return res.status(400).json({ message: "name required" });
  }

  try {
    const newSubject = new Subject({ name, userId });
    await newSubject.save();
    res.json(newSubject);
    console.log("USER ID FROM TOKEN:", req.userPayload?.id);
  } catch (err) {
    
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ message: "Subject already exists for this user" });
    }
    res.status(500).json({ message: "Server error" });
  }
});



router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedOne = await Subject.findOneAndDelete({
      _id: req.params.id,
      userId: req.userPayload.id
    });

    if (!deletedOne) {
      return res.status(404).json({ message: "Subject not found or not yours" });
    }

    res.json({ message: "Subject deleted", subject: deletedOne });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router

