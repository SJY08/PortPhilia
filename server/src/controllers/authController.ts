import { Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import prisma from "../prisma/client"
import dotenv from "dotenv"

dotenv.config()

const ACCESS_TOKEN_SECRET =
    process.env.ACCESS_TOKEN_SECRET || "youraccesstokensecret"
const REFRESH_TOKEN_SECRET =
    process.env.REFRESH_TOKEN_SECRET || "yourrefreshtokensecret"
const ACCESS_TOKEN_EXPIRES_IN = "15m"
const REFRESH_TOKEN_EXPIRES_IN = "7d"

function generateTokens(userId: number) {
    const accessToken = jwt.sign({ userId }, ACCESS_TOKEN_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    })
    const refreshToken = jwt.sign({ userId }, REFRESH_TOKEN_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    })
    return { accessToken, refreshToken }
}

export async function signup(req: Request, res: Response) {
    const { name, username, password } = req.body
    if (!name || !username || !password) {
        return res
            .status(400)
            .json({ error: "이름, 아이디, 비밀번호는 필수입니다." })
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await prisma.user.create({
            data: {
                name,
                username,
                password: hashedPassword,
            },
        })
        const tokens = generateTokens(newUser.id)
        res.json({ user: newUser, ...tokens })
    } catch (error: any) {
        if (error.code === "P2002") {
            return res
                .status(400)
                .json({ error: "이미 존재하는 아이디입니다." })
        }
        res.status(500).json({ error: "서버 에러" })
    }
}

export async function login(req: Request, res: Response) {
    const { username, password } = req.body
    if (!username || !password) {
        return res
            .status(400)
            .json({ error: "아이디와 비밀번호를 입력하세요." })
    }
    try {
        const user = await prisma.user.findUnique({
            where: { username },
        })
        if (!user)
            return res.status(400).json({
                error: "유효하지 않은 아이디 혹은 비밀번호입니다. notuser",
            })

        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword)
            return res.status(400).json({
                error: "유효하지 않은 아이디 혹은 비밀번호입니다. notvalidpassword",
            })

        const tokens = generateTokens(user.id)
        res.json({ user, ...tokens })
    } catch (error) {
        res.status(500).json({ error: "서버 에러" })
    }
}

export async function verifyToken(req: Request, res: Response) {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
        return res.status(401).json({ error: "토큰이 없습니다." })
    }

    try {
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as {
            userId: number
        }

        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
        })

        if (!user) {
            return res
                .status(404)
                .json({ error: "존재하지 않는 사용자입니다." })
        }

        return res.status(200).json({ valid: true, userId: decoded.userId })
    } catch (err) {
        return res.status(403).json({ error: "유효하지 않은 토큰입니다." })
    }
}

export async function verifyPassword(req: Request, res: Response) {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
        return res.status(401).json({ error: "토큰이 없습니다." })
    }

    const { password } = req.body
    if (!password) {
        return res.status(400).json({ error: "비밀번호를 입력하세요." })
    }

    try {
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as {
            userId: number
        }

        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
        })

        if (!user) {
            return res.status(404).json({ error: "사용자를 찾을 수 없습니다." })
        }

        const isValid = await bcrypt.compare(password, user.password)

        if (!isValid) {
            return res.status(401).json({
                valid: false,
                message: "비밀번호가 일치하지 않습니다.",
            })
        }

        return res
            .status(200)
            .json({ valid: true, message: "비밀번호가 일치합니다." })
    } catch (error) {
        return res.status(403).json({ error: "유효하지 않은 토큰입니다." })
    }
}

export async function changePassword(req: Request, res: Response) {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
        return res.status(401).json({ error: "토큰이 없습니다." })
    }

    const { newPassword } = req.body
    if (!newPassword || typeof newPassword !== "string") {
        return res.status(400).json({ error: "새 비밀번호를 입력하세요." })
    }

    try {
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as {
            userId: number
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)

        await prisma.user.update({
            where: { id: decoded.userId },
            data: { password: hashedPassword },
        })

        return res
            .status(200)
            .json({ message: "비밀번호가 성공적으로 변경되었습니다." })
    } catch (error) {
        console.error("changePassword error:", error)
        return res.status(500).json({ error: "서버 에러" })
    }
}

export async function deleteUser(req: Request, res: Response) {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
        return res.status(401).json({ error: "토큰이 없습니다." })
    }

    try {
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as {
            userId: number
        }

        await prisma.user.delete({
            where: { id: decoded.userId },
        })

        return res.status(200).json({ message: "회원 탈퇴가 완료되었습니다." })
    } catch (error) {
        console.error("deleteUser error:", error)
        return res.status(500).json({ error: "서버 에러" })
    }
}
