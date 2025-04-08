import { Request, Response } from "express"
import prisma from "../prisma/client"
import { AuthRequest } from "../middleware/authenticate"

export async function getProjects(req: AuthRequest, res: Response) {
    try {
        const projects = await prisma.project.findMany({
            where: { user_id: req.user!.userId },
        })
        res.json(projects)
    } catch (error) {
        res.status(500).json({ error: "서버 에러" })
    }
}

export async function getProjectById(req: AuthRequest, res: Response) {
    const projectId = Number(req.params.id)
    try {
        const project = await prisma.project.findUnique({
            where: { id: projectId },
        })
        if (!project || project.user_id !== req.user!.userId) {
            return res.status(404).json({
                error: "프로젝트를 찾을 수 없거나 접근 권한이 없습니다.",
            })
        }
        res.json(project)
    } catch (error) {
        res.status(500).json({ error: "서버 에러" })
    }
}

export async function addProject(req: AuthRequest, res: Response) {
    try {
        const { project_name, tech_used, project_intro, my_role } = req.body
        const newProject = await prisma.project.create({
            data: {
                user_id: req.user!.userId,
                project_name,
                tech_used,
                project_intro,
                my_role,
            },
        })
        res.status(201).json(newProject)
    } catch (error) {
        res.status(500).json({ error: "서버 에러" })
    }
}

export async function updateProject(req: AuthRequest, res: Response) {
    const projectId = Number(req.params.id)
    const updateData = req.body
    try {
        const project = await prisma.project.findUnique({
            where: { id: projectId },
        })
        if (!project || project.user_id !== req.user!.userId) {
            return res.status(404).json({
                error: "프로젝트를 찾을 수 없거나 접근 권한이 없습니다.",
            })
        }
        const updatedProject = await prisma.project.update({
            where: { id: projectId },
            data: updateData,
        })
        res.json(updatedProject)
    } catch (error) {
        res.status(500).json({ error: "서버 에러" })
    }
}

export async function deleteProject(req: AuthRequest, res: Response) {
    const projectId = Number(req.params.id)
    try {
        const project = await prisma.project.findUnique({
            where: { id: projectId },
        })
        if (!project || project.user_id !== req.user!.userId) {
            return res.status(404).json({
                error: "프로젝트를 찾을 수 없거나 접근 권한이 없습니다.",
            })
        }
        await prisma.project.delete({
            where: { id: projectId },
        })
        res.json({ message: "프로젝트가 삭제되었습니다." })
    } catch (error) {
        res.status(500).json({ error: "서버 에러" })
    }
}
