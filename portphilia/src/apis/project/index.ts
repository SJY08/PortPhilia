import { AxiosError } from "axios"
import { instance } from ".."
import { ProjectType } from "./type"

export default class ProjectsService {
    static async getProjects(): Promise<ProjectType[]> {
        try {
            const response = await instance.get<ProjectType[]>("/projects")
            return response.data
        } catch (error) {
            console.error("❌ 프로젝트 목록 가져오기 실패", error)
            throw new Error("프로젝트 목록 가져오기 실패")
        }
    }

    static async getProjectById(
        projectId: string | number
    ): Promise<ProjectType> {
        try {
            const response = await instance.get<ProjectType>(
                `/projects/${projectId}`
            )
            return response.data
        } catch (error) {
            console.error("❌ 프로젝트 가져오기 실패", error)
            throw new Error("프로젝트 가져오기 실패")
        }
    }

    static async addProject(project: ProjectType): Promise<number> {
        try {
            const payload = {
                project_name: project.title,
                tech_used: project.tech_stack,
                project_intro: project.description,
                my_role: project.i_do,
                link: project.link,
            }
            const response = await instance.post("/projects", payload)
            return response.status
        } catch (error) {
            if (error instanceof AxiosError)
                return error.response?.status ?? 500
            return 500
        }
    }

    static async updateProject(
        projectId: string | number,
        project: ProjectType
    ): Promise<number> {
        try {
            const payload = {
                project_name: project.title,
                tech_used: project.tech_stack,
                project_intro: project.description,
                my_role: project.i_do,
                link: project.link,
            }
            const response = await instance.put(
                `/projects/${projectId}`,
                payload
            )
            return response.status
        } catch (error) {
            if (error instanceof AxiosError)
                return error.response?.status ?? 500
            return 500
        }
    }

    static async deleteProject(projectId: string | number): Promise<number> {
        try {
            const response = await instance.delete(`/projects/${projectId}`)
            return response.status
        } catch (error) {
            if (error instanceof AxiosError)
                return error.response?.status ?? 500
            return 500
        }
    }
}
