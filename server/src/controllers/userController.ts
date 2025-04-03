import { Request, Response } from "express"
import prisma from "../prisma/client"
import { AuthRequest } from "../middleware/authenticate"

export async function getUser(req: AuthRequest, res: Response) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user!.userId },
            select: {
                id: true,
                username: true,
                name: true,
                birth_date: true,
                phone_number: true,
                email: true,
                education: true,
                short_intro: true,
                bio: true,
                tech_stack: true,
                certifications: true,
                profile_image_url: true,
            },
        })
        if (!user)
            return res.status(404).json({ error: "유저를 찾을 수 없습니다." })
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: "서버 에러" })
    }
}

export async function updateUser(req: AuthRequest, res: Response) {
    const updateData = req.body
    try {
        const updatedUser = await prisma.user.update({
            where: { id: req.user!.userId },
            data: updateData,
        })
        res.json(updatedUser)
    } catch (error) {
        res.status(500).json({ error: "서버 에러" })
    }
}
