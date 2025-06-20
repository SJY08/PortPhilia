import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes"
import userRoutes from "./routes/userRoutes"
import projectRoutes from "./routes/projectRoutes"
import cors from "cors"
import bodyParser = require("body-parser")

dotenv.config()

const app = express()
app.use(express.json())
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
}
app.use(cors(corsOptions))

app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))
app.use("/uploads", express.static("uploads"))

app.use("/auth", authRoutes)
app.use("/user", userRoutes)
app.use("/projects", projectRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`서버가 ${PORT}번 포트에서 실행 중입니다.`)
})
