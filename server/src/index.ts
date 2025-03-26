import express from "express"
import authRoutes from "./routes/authRoutes"
import portfolioRoutes from "./routes/portfolioRoutes"
import projectRoutes from "./routes/projectRoutes"

const app = express()

app.use(express.json())

// 각 도메인 별 라우터 등록
app.use("/auth", authRoutes)
app.use("/portfolio", portfolioRoutes)
app.use("/projects", projectRoutes)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
