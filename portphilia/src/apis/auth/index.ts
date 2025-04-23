import { AxiosError } from "axios"
import { instance } from ".."
import { tempCookie } from "../../utils/tempCookie"
import { LoginData, AuthResponse, RegisterData } from "./type"

export default class AuthService {
    static async login(data: LoginData): Promise<number> {
        try {
            const response = await instance.post<AuthResponse>(
                "/auth/login",
                data
            )
            if (response.data.accessToken && response.data.refreshToken) {
                tempCookie.setAccessToken(response.data.accessToken)
                tempCookie.setRefreshToken(response.data.refreshToken)
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

    static async register(data: RegisterData): Promise<number> {
        try {
            const response = await instance.post<AuthResponse>(
                "/auth/signup",
                data
            )
            if (response.data.accessToken && response.data.refreshToken) {
                tempCookie.setAccessToken(response.data.accessToken)
                tempCookie.setRefreshToken(response.data.refreshToken)
            }
            return response.status
        } catch (error) {
            if (error instanceof AxiosError)
                return error.response?.status ?? 500
            return 500
        }
    }

    static async logout(): Promise<number> {
        try {
            tempCookie.clearTokens()
            return 200
        } catch (error) {
            if (error instanceof AxiosError)
                return error.response?.status ?? 500
            return 500
        }
    }

    static async refreshToken(): Promise<number> {
        try {
            const refreshToken = tempCookie.getRefreshToken()
            const response = await instance.post<AuthResponse>(
                "/auth/refresh",
                { refreshToken }
            )
            if (response.data.accessToken && response.data.refreshToken) {
                tempCookie.setAccessToken(response.data.accessToken)
                tempCookie.setRefreshToken(response.data.refreshToken)
            }
            return response.status
        } catch (error) {
            if (error instanceof AxiosError)
                return error.response?.status ?? 500
            return 500
        }
    }

    static async verify(): Promise<number> {
        try {
            const response = await instance.get("/auth/verify")
            return response.status
        } catch (error) {
            if (error instanceof AxiosError)
                return error.response?.status ?? 500
            return 500
        }
    }
}
