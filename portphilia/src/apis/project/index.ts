import { AxiosError } from "axios"
import { instance } from ".."
import { Project } from "./type"

export default class ProjectsService {
    // 전체 프로젝트 목록 가져오기
    static async getProjects(): Promise<Project[]> {
        try {
            const response = await instance.get<{ projects: Project[] }>(
                "/projects"
            )
            return response.data.projects
        } catch (error) {
            console.error("프로젝트 목록 가져오기 실패", error)
            throw new Error("프로젝트 목록 가져오기 실패")
        }
    }

    // 특정 프로젝트 가져오기 (ID 기준)
    static async getProjectById(projectId: string | number): Promise<Project> {
        try {
            const response = await instance.get<{ project: Project }>(
                `/projects/${projectId}`
            )
            return response.data.project
        } catch (error) {
            console.error("프로젝트 가져오기 실패", error)
            throw new Error("프로젝트 가져오기 실패")
        }
    }

    // 새 프로젝트 추가
    static async addProject(project: Project): Promise<number> {
        try {
            // 서버에서는 tech_stack을 JSON 문자열로 받으므로, 변환하여 전송할 수 있습니다.
            const payload = {
                ...project,
                tech_stack: JSON.stringify(project.tech_stack),
            }
            const response = await instance.post("/projects", payload)
            return response.status
        } catch (error) {
            if (error instanceof AxiosError)
                return error.response?.status ?? 500
            return 500
        }
    }

    // 프로젝트 업데이트
    static async updateProject(
        projectId: string | number,
        project: Project
    ): Promise<number> {
        try {
            const payload = {
                ...project,
                tech_stack: JSON.stringify(project.tech_stack),
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

    // 프로젝트 삭제
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
