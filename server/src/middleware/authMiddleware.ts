import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

export interface AuthRequest extends Request {
    user?: {
        id: number
        username: string
    }
}

const blacklistedTokens = new Set<string>()

export const addToBlacklist = (token: string) => {
    blacklistedTokens.add(token)
}

export const removeFromBlacklist = (token: string) => {
    blacklistedTokens.delete(token)
}

export const logoutUser = (token: string) => {
    addToBlacklist(token)
}

export const verifyToken = async (
    req: AuthRequest,
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
        req.user = decoded
        next()
    } catch (err) {
        res.status(401).json({ message: "토큰이 유효하지 않습니다" })
    }
}

// verifyToken을 authenticate라는 이름으로도 내보내기
export const authenticate = verifyToken
