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
            return res
                .status(400)
                .json({ error: "유효하지 않은 아이디 혹은 비밀번호입니다." })

        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword)
            return res
                .status(400)
                .json({ error: "유효하지 않은 아이디 혹은 비밀번호입니다." })

        const tokens = generateTokens(user.id)
        res.json({ user, ...tokens })
    } catch (error) {
        res.status(500).json({ error: "서버 에러" })
    }
}
