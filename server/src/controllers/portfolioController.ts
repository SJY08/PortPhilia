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
}

export const updatePortfolio = async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    const { education, short_intro, bio, tech_stack, certifications } = req.body

    try {
        const [result]: any = await db.query(
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
