import { Response } from "express"
import { db } from "../db"
import { AuthRequest } from "../middleware/authMiddleware"

export const getProjects = async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    try {
        const [projects]: any = await db.query(
            "SELECT * FROM projects WHERE user_id = ?",
            [userId]
        )

        return res.status(200).json({ projects })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Server error" })
    }
}

export const getProjectById = async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id
    const projectId = req.params.id
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    try {
        const [projects]: any = await db.query(
            "SELECT * FROM projects WHERE id = ? AND user_id = ?",
            [projectId, userId]
        )

        if (projects.length === 0) {
            return res.status(404).json({ message: "Project not found" })
        }

        return res.status(200).json({ project: projects[0] })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Server error" })
    }
}

export const addProject = async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    const { title, description, link, tech_stack } = req.body

    try {
        await db.query(
            "INSERT INTO projects (user_id, title, description, link, tech_stack) VALUES (?, ?, ?, ?, ?)",
            [userId, title, description, link, JSON.stringify(tech_stack)]
        )

        return res.status(201).json({ message: "Project added successfully" })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Server error" })
    }
}

export const updateProject = async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id
    const projectId = req.params.id
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    const { title, description, link, tech_stack } = req.body

    try {
        const [result]: any = await db.query(
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

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Project not found" })
        }

        return res.status(200).json({ message: "Project updated successfully" })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Server error" })
    }
}

export const deleteProject = async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id
    const projectId = req.params.id
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    try {
        const [result]: any = await db.query(
            "DELETE FROM projects WHERE id = ? AND user_id = ?",
            [projectId, userId]
        )

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Project not found" })
        }

        return res.status(200).json({ message: "Project deleted successfully" })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Server error" })
    }
}
