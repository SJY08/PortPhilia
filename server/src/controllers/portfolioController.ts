import { Response } from "express"
import { db } from "../db"
import { AuthRequest } from "../middleware/authMiddleware"

export const getPortfolio = async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    try {
        const [rows]: any = await db.query(
            "SELECT education, short_intro, bio, tech_stack, certifications, profile_image_url FROM users WHERE id = ?",
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
            tech_stack: userPortfolio.tech_stack
                ? JSON.parse(userPortfolio.tech_stack)
                : [],
            certifications: userPortfolio.certifications
                ? JSON.parse(userPortfolio.certifications)
                : [],
            profile_image_url: userPortfolio.profile_image_url,
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Server error" })
    }
}

export const updatePortfolio = async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    const { education, short_intro, bio, tech_stack, certifications } = req.body
    // 업로드된 파일이 있다면 해당 파일의 경로를 저장, 없으면 기존 값을 유지
    const profileImageUrl = req.file ? `/uploads/${req.file.filename}` : null

    try {
        const [result]: any = await db.query(
            "UPDATE users SET education = ?, short_intro = ?, bio = ?, tech_stack = ?, certifications = ?, profile_image_url = COALESCE(?, profile_image_url) WHERE id = ?",
            [
                education,
                short_intro,
                bio,
                JSON.stringify(tech_stack),
                JSON.stringify(certifications),
                profileImageUrl,
                userId,
            ]
        )

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" })
        }

        return res
            .status(200)
            .json({ message: "Portfolio updated successfully" })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Server error" })
    }
}
