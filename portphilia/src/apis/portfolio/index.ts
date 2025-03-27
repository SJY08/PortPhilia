// src/services/PortfolioService.ts
import { AxiosError } from "axios"
import { instance } from ".."
import { Portfolio } from "./type"

export default class PortfolioService {
    // 포트폴리오 정보 가져오기
    static async getPortfolio(): Promise<Portfolio> {
        try {
            const response = await instance.get<Portfolio>("/portfolio")
            return response.data
        } catch (error) {
            console.error("포트폴리오 가져오기 실패", error)
            throw new Error("포트폴리오 가져오기 실패")
        }
    }

    // 포트폴리오 정보 업데이트
    static async updatePortfolio(data: Portfolio): Promise<number> {
        try {
            const response = await instance.put("/portfolio", data)
            return response.status
        } catch (error) {
            if (error instanceof AxiosError)
                return error.response?.status ?? 500
            return 500
        }
    }
}
