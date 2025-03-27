import express from "express"
import authRoutes from "./routes/authRoutes"
import portfolioRoutes from "./routes/portfolioRoutes"
import projectRoutes from "./routes/projectRoutes"
import cors from "cors"

const app = express()

app.use(express.json())

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
)

// 모든 OPTIONS 요청에 대해 CORS 헤더를 반환하도록 설정
app.options(
    "*",
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
)

// 각 도메인 별 라우터 등록
app.use("/auth", authRoutes)
app.use("/portfolio", portfolioRoutes)
app.use("/projects", projectRoutes)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
