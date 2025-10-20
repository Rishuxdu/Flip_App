const express = require("express")
const app = express()
const cors = require("cors")
const cookieParser = require("cookie-parser")
const cardRoutes = require("./routes/cardRoutes")
const subjectRoutes = require("./routes/subjectRoutes")
const userRoutes = require("./routes/userRoute")

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use("/cards", cardRoutes)
app.use("/subjects", subjectRoutes)
app.use("/", userRoutes)

app.listen(3000, () => { console.log("server started") })

