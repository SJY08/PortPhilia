// src/controllers/authController.ts
import { Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { db } from "../db"

// 리프래시 토큰 저장 (메모리 사용, 실제 서비스에서는 DB나 Redis를 사용하는 것이 좋습니다)
const refreshTokens = new Set<string>()

export const registerUser = async (req: Request, res: Response) => {
    const { username, password, name } = req.body

    if (!name || !username || !password) {
        return res
            .status(400)
            .json({ message: "name, username, password are required" })
    }

    try {
        const [existingUser]: any = await db.query(
            "SELECT * FROM users WHERE username = ?",
            [username]
        )

        if (existingUser.length > 0) {
            return res.status(400).json({ message: "Username already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await db.query(
            "INSERT INTO users (name, username, password) VALUES (?, ?, ?)",
            [name, username, hashedPassword]
        )

        return res.status(201).json({ message: "User registered successfully" })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Server error" })
    }
}

export const loginUser = async (req: Request, res: Response) => {
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

        // 액세스 토큰: 15분 유효
        const accessToken = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET || "your_jwt_secret",
            { expiresIn: "15m" }
        )

        // 리프래시 토큰: 7일 유효
        const refreshToken = jwt.sign(
            { id: user.id, username: user.username },
            process.env.REFRESH_TOKEN_SECRET || "your_refresh_token_secret",
            { expiresIn: "7d" }
        )

        // 리프래시 토큰 저장
        refreshTokens.add(refreshToken)

        return res.status(200).json({
            message: "Login successful",
            accessToken,
            refreshToken,
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Server error" })
    }
}

export const refreshAccessToken = async (req: Request, res: Response) => {
    const { token } = req.body // 클라이언트가 body로 전송

    if (!token) {
        return res.status(401).json({ message: "리프래시 토큰이 필요합니다" })
    }

    if (!refreshTokens.has(token)) {
        return res
            .status(403)
            .json({ message: "유효하지 않은 리프래시 토큰입니다" })
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.REFRESH_TOKEN_SECRET || "your_refresh_token_secret"
        ) as { id: number; username: string }

        // 새로운 액세스 토큰 발급 (15분 유효)
        const newAccessToken = jwt.sign(
            { id: decoded.id, username: decoded.username },
            process.env.JWT_SECRET || "your_jwt_secret",
            { expiresIn: "15m" }
        )

        return res.status(200).json({ accessToken: newAccessToken })
    } catch (error) {
        return res
            .status(403)
            .json({ message: "리프래시 토큰이 유효하지 않습니다" })
    }
}

// 선택: 로그아웃 시 리프래시 토큰 제거
export const logoutUser = async (req: Request, res: Response) => {
    const { token } = req.body // 클라이언트에서 로그아웃할 때 리프래시 토큰 전송
    if (token && refreshTokens.has(token)) {
        refreshTokens.delete(token)
    }
    return res.status(200).json({ message: "Logged out successfully" })
}
