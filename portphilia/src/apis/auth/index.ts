// src/services/AuthService.ts
import { AxiosError } from "axios"
import { instance } from ".."
import { tempCookie } from "../../utils/tempCookie"
import { LoginData, AuthResponse, RegisterData } from "./type"

export default class AuthService {
    // 로그인
    static async login(data: LoginData): Promise<number> {
        try {
            const response = await instance.post<AuthResponse>(
                "/auth/login",
                data
            )
            // 서버에서 accessToken, refreshToken 반환
            if (response.data.accessToken && response.data.refreshToken) {
                tempCookie.setTokens({
                    accessToken: response.data.accessToken,
                    refreshToken: response.data.refreshToken,
                })
            } else {
                console.error("토큰이 반환되지 않았습니다")
            }
            return response.status
        } catch (error) {
            if (error instanceof AxiosError)
                return error.response?.status ?? 500
            return 500
        }
    }

    // 회원가입 (가입 후 자동 로그인 처리 가능)
    static async register(data: RegisterData): Promise<number> {
        try {
            const response = await instance.post<AuthResponse>(
                "/auth/register",
                data
            )
            // 회원가입 시 토큰 반환이 필요한 경우 아래처럼 처리
            if (response.data.accessToken && response.data.refreshToken) {
                tempCookie.setTokens({
                    accessToken: response.data.accessToken,
                    refreshToken: response.data.refreshToken,
                })
            }
            return response.status
        } catch (error) {
            if (error instanceof AxiosError)
                return error.response?.status ?? 500
            return 500
        }
    }

    // 로그아웃: 서버에 리프래시 토큰 전달 후 로컬 토큰 삭제
    static async logout(): Promise<number> {
        try {
            const refreshToken = tempCookie.getRefreshToken()
            if (!refreshToken) throw new Error("리프래시 토큰이 없습니다")
            const response = await instance.post("/auth/logout", {
                token: refreshToken,
            })
            if (response.status === 200) {
                tempCookie.clearTokens()
            }
            return response.status
        } catch (error) {
            if (error instanceof AxiosError)
                return error.response?.status ?? 500
            return 500
        }
    }
}
