// src/utils/axiosInstance.ts
import axios, {
    AxiosError,
    InternalAxiosRequestConfig,
    AxiosResponse,
} from "axios"
import { tempCookie } from "../utils/tempCookie"

const BASEURL = "http://localhost:8080"

const instance = axios.create({
    baseURL: BASEURL,
    timeout: 10000,
})

// 요청 인터셉터: 매 요청마다 accessToken을 헤더에 추가
instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = tempCookie.getAccessToken()
        if (token) {
            // headers가 AxiosHeaders 인스턴스인 경우 set 메서드 사용
            if (config.headers && typeof config.headers.set === "function") {
                config.headers.set("Authorization", token)
            } else {
                // fallback: headers가 단순 객체인 경우
                ;(config.headers as any)["Authorization"] = token
            }
        }
        return config
    },
    (error: AxiosError) => Promise.reject(error)
)

// 인터페이스 확장: _retry 플래그 추가
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean
}

// 응답 인터셉터: 401 응답 시 리프래시 토큰으로 토큰 재발급
instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as CustomAxiosRequestConfig

        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true
            const refreshToken = tempCookie.getRefreshToken()
            if (refreshToken) {
                try {
                    // 리프래시 토큰 요청 (서버의 엔드포인트: /auth/refresh-token)
                    const { data } = await instance.post<{
                        accessToken: string
                    }>("/auth/refresh-token", { token: refreshToken })
                    // 새 액세스 토큰 저장
                    tempCookie.setAccessToken(data.accessToken)
                    // 새로운 토큰을 헤더에 설정하고 원래 요청 재시도
                    if (
                        originalRequest.headers &&
                        typeof originalRequest.headers.set === "function"
                    ) {
                        originalRequest.headers.set(
                            "Authorization",
                            tempCookie.getAccessToken() as string
                        )
                    } else {
                        ;(originalRequest.headers as any)["Authorization"] =
                            tempCookie.getAccessToken()
                    }
                    return instance(originalRequest)
                } catch (refreshError) {
                    // 리프래시 실패 시 토큰 삭제 후 로그아웃 처리 (추가 처리 가능)
                    tempCookie.clearTokens()
                    return Promise.reject(refreshError)
                }
            }
        }
        return Promise.reject(error)
    }
)

export { instance }
