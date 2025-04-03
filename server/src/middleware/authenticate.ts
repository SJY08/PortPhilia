import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const ACCESS_TOKEN_SECRET =
    process.env.ACCESS_TOKEN_SECRET || "youraccesstokensecret"

export interface AuthRequest extends Request {
    user?: { userId: number }
}

export function authenticateToken(
    req: AuthRequest,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    if (!token) return res.sendStatus(401)

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) return res.sendStatus(403)
        req.user = payload as { userId: number }
        next()
    })
}
