import express, { Request, Response, NextFunction } from "express"
import mysql from "mysql2/promise"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const app = express()
app.use(express.json())

// DB 연결 설정
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "tjwlgh828***", // 본인의 DB 비밀번호로 수정
    database: "portphilia",
})

// JWT 인증 미들웨어
export interface AuthRequest extends Request {
    user?: {
        id: number
        username: string
    }
}

// blacklistedTokens는 토큰을 블랙리스트에 저장하는 Set입니다.
const blacklistedTokens = new Set<string>()

// 토큰을 블랙리스트에 추가하는 함수
const addToBlacklist = (token: string) => {
    blacklistedTokens.add(token)
}

// 토큰을 블랙리스트에서 제거하는 함수 (로그인 시)
const removeFromBlacklist = (token: string) => {
    blacklistedTokens.delete(token)
}

// 예시: 토큰을 로그아웃 시 블랙리스트에 추가
const logoutUser = (token: string) => {
    addToBlacklist(token)
}

// 로그인 시 토큰을 사용했을 때 블랙리스트 체크
const verifyToken = async (
    req: AuthRequest, // AuthRequest로 타입을 지정
    res: Response,
    next: NextFunction
): Promise<void> => {
    const token = req.headers.authorization?.replace(/Bearer\s+/g, "").trim()

    if (!token) {
        res.status(403).json({ message: "토큰이 없습니다" })
        return
    }

    if (blacklistedTokens.has(token)) {
        res.status(401).json({ message: "로그아웃된 토큰입니다" })
        return
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
            id: number
            username: string
        }
        req.user = decoded // 여기서 req.user 사용 가능
        next()
    } catch (err) {
        res.status(401).json({ message: "토큰이 유효하지 않습니다" })
    }
}

// 회원가입 API
// 회원가입 API
app.post("/register", async (req: Request, res: Response) => {
    const { username, password, name } = req.body

    if (!name || !username || !password) {
        return res
            .status(400)
            .json({ message: "name, username, password are required" })
    }

    try {
        // 사용자 이름 중복 확인
        const [existingUser]: any = await db.query(
            "SELECT * FROM users WHERE username = ?",
            [username]
        )

        if (existingUser.length > 0) {
            return res.status(400).json({ message: "Username already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const [result] = await db.query(
            "INSERT INTO users (name, username, password) VALUES (?, ?, ?)",
            [name, username, hashedPassword]
        )

        return res.status(201).json({ message: "User registered successfully" })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Server error" })
    }
})

// 로그인 API
app.post("/login", async (req: Request, res: Response) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res
            .status(400)
            .json({ message: "Username and password are required" })
    }

    try {
        const [rows]: any = await db.query(
            "SELECT * FROM users WHERE username = ?",
            [username]
        )

        if (rows.length === 0) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const user = rows[0]
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const token = jwt.sign({ userId: user.id }, "your_jwt_secret", {
            expiresIn: "1h",
        })

        return res.status(200).json({ message: "Login successful", token })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Server error" })
    }
})

// 포트폴리오 조회 API
app.get("/portfolio", verifyToken, async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    try {
        const [rows]: any = await db.query(
            "SELECT education, short_intro, bio, tech_stack, certifications FROM users WHERE id = ?",
            [userId]
        )

        if (rows.length === 0) {
            return res.status(404).json({ message: "User not found" })
        }

        const userPortfolio = rows[0]

        return res.status(200).json({
            education: userPortfolio.education,
            short_intro: userPortfolio.short_intro,
            bio: userPortfolio.bio,
            tech_stack: JSON.parse(userPortfolio.tech_stack),
            certifications: JSON.parse(userPortfolio.certifications),
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Server error" })
    }
})

// 포트폴리오 수정 API
app.put("/portfolio", verifyToken, async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    const { education, short_intro, bio, tech_stack, certifications } = req.body

    try {
        const [result] = await db.query(
            "UPDATE users SET education = ?, short_intro = ?, bio = ?, tech_stack = ?, certifications = ? WHERE id = ?",
            [
                education,
                short_intro,
                bio,
                JSON.stringify(tech_stack),
                JSON.stringify(certifications),
                userId,
            ]
        )

        // affectedRows가 0이면 사용자가 없다는 의미로 처리
        if ((result as mysql.ResultSetHeader).affectedRows === 0) {
            return res.status(404).json({ message: "User not found" })
        }

        return res
            .status(200)
            .json({ message: "Portfolio updated successfully" })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Server error" })
    }
})

// 프로젝트 추가 API
app.post("/projects", verifyToken, async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    const { title, description, link, tech_stack } = req.body

    try {
        const [result] = await db.query(
            "INSERT INTO projects (user_id, title, description, link, tech_stack) VALUES (?, ?, ?, ?, ?)",
            [userId, title, description, link, JSON.stringify(tech_stack)]
        )

        return res.status(201).json({ message: "Project added successfully" })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Server error" })
    }
})

// 프로젝트 수정 API
app.put(
    "/projects/:id",
    verifyToken,
    async (req: AuthRequest, res: Response) => {
        const userId = req.user?.id
        const projectId = req.params.id
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        const { title, description, link, tech_stack } = req.body

        try {
            const [result] = await db.query(
                "UPDATE projects SET title = ?, description = ?, link = ?, tech_stack = ? WHERE id = ? AND user_id = ?",
                [
                    title,
                    description,
                    link,
                    JSON.stringify(tech_stack),
                    projectId,
                    userId,
                ]
            )

            if ((result as mysql.ResultSetHeader).affectedRows === 0) {
                return res.status(404).json({ message: "Project not found" })
            }

            return res
                .status(200)
                .json({ message: "Project updated successfully" })
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Server error" })
        }
    }
)

// 프로젝트 삭제 API
app.delete(
    "/projects/:id",
    verifyToken,
    async (req: AuthRequest, res: Response) => {
        const userId = req.user?.id
        const projectId = req.params.id
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        try {
            const [result] = await db.query(
                "DELETE FROM projects WHERE id = ? AND user_id = ?",
                [projectId, userId]
            )

            if ((result as mysql.ResultSetHeader).affectedRows === 0) {
                return res.status(404).json({ message: "Project not found" })
            }

            return res
                .status(200)
                .json({ message: "Project deleted successfully" })
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Server error" })
        }
    }
)

// 서버 실행
app.listen(8080, () => {
    console.log("Server running on port 8080")
})
