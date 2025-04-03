import { AxiosError } from "axios"
import { instance } from ".."
import { Portfolio } from "../portfolio/type"

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

    // 포트폴리오 정보 업데이트 (선택적으로 이미지 파일 포함)
    static async updatePortfolio(
        data: Portfolio,
        imageFile?: File
    ): Promise<number> {
        try {
            const formData = new FormData()
            formData.append("education", data.education)
            formData.append("short_intro", data.short_intro)
            formData.append("bio", data.bio)
            formData.append("tech_stack", JSON.stringify(data.tech_stack))
            formData.append(
                "certifications",
                JSON.stringify(data.certifications)
            )
            if (imageFile) {
                formData.append("profile_image", imageFile)
            }
            const response = await instance.put("/portfolio", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            return response.status
        } catch (error) {
            if (error instanceof AxiosError)
                return error.response?.status ?? 500
            return 500
        }
    }
}
