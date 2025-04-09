import { AxiosError } from "axios"
import { instance } from ".."
import { UpdatePortfolio, Portfolio } from "../portfolio/type"

export default class PortfolioService {
    static async getPortfolio(): Promise<Portfolio> {
        try {
            const response = await instance.get<Portfolio>("/user")
            return response.data
        } catch (error) {
            console.error("포트폴리오 가져오기 실패", error)
            throw new Error("포트폴리오 가져오기 실패")
        }
    }

    static async updatePortfolio(data: UpdatePortfolio): Promise<number> {
        try {
            const response = await instance.put("/user", data)
            return response.status
        } catch (error) {
            if (error instanceof AxiosError)
                return error.response?.status ?? 500
            return 500
        }
    }
}
