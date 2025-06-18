import { AxiosError } from "axios"
import { instance } from ".."
import type { ProjectType, ProjectTypeWithoutId } from "./type"

export default class ProjectsService {
    static async getProjects(): Promise<ProjectType[]> {
        try {
            const response = await instance.get("/projects")
            const rawProjects = response.data
            const converted = rawProjects.map(
                (proj: any): ProjectType => ({
                    id: proj.id,
                    title: proj.project_name,
                    description: proj.project_intro,
                    tech_stack: proj.tech_used,
                    i_do: proj.my_role,
                })
            )
            return converted
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

    static async addProject(project: ProjectTypeWithoutId): Promise<{
        status: number
        data?: ProjectType
    }> {
        try {
            const payload = {
                project_name: project.title,
                tech_used: project.tech_stack,
                project_intro: project.description,
                my_role: project.i_do,
            }
            const response = await instance.post("/projects", payload)

            // 서버에서 생성된 프로젝트 데이터를 변환
            const createdProject: ProjectType = {
                id: response.data.id,
                title: response.data.project_name,
                description: response.data.project_intro,
                tech_stack: response.data.tech_used,
                i_do: response.data.my_role,
            }

            return {
                status: response.status,
                data: createdProject,
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                return {
                    status: error.response?.status ?? 500,
                }
            }
            return {
                status: 500,
            }
        }
    }

    static async updateProject(
        projectId: string | number,
        project: ProjectTypeWithoutId
    ): Promise<{
        status: number
        data?: ProjectType
    }> {
        try {
            const payload = {
                project_name: project.title,
                tech_used: project.tech_stack,
                project_intro: project.description,
                my_role: project.i_do,
            }
            const response = await instance.put(
                `/projects/${projectId}`,
                payload
            )

            // 업데이트된 프로젝트 데이터를 변환
            const updatedProject: ProjectType = {
                id: projectId,
                title: project.title,
                description: project.description,
                tech_stack: project.tech_stack,
                i_do: project.i_do,
            }

            return {
                status: response.status,
                data: updatedProject,
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                return {
                    status: error.response?.status ?? 500,
                }
            }
            return {
                status: 500,
            }
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
