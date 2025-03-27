// src/services/ProjectService.ts
import { AxiosError } from "axios"
import { instance } from ".."
import { Project } from "./type"

export default class ProjectService {
    // 프로젝트 추가
    static async addProject(data: Project): Promise<number> {
        try {
            const response = await instance.post("/projects", data)
            return response.status
        } catch (error) {
            if (error instanceof AxiosError)
                return error.response?.status ?? 500
            return 500
        }
    }

    // 프로젝트 수정 (프로젝트 ID 필요)
    static async updateProject(
        projectId: number,
        data: Project
    ): Promise<number> {
        try {
            const response = await instance.put(`/projects/${projectId}`, data)
            return response.status
        } catch (error) {
            if (error instanceof AxiosError)
                return error.response?.status ?? 500
            return 500
        }
    }

    // 프로젝트 삭제 (프로젝트 ID 필요)
    static async deleteProject(projectId: number): Promise<number> {
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
