import { Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { db } from "../db"

export const registerUser = async (req: Request, res: Response) => {
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

        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET || "your_jwt_secret",
            {
                expiresIn: "1h",
            }
        )

        return res.status(200).json({ message: "Login successful", token })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Server error" })
    }
}
