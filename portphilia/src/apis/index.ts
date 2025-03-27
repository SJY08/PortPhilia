// api.ts
import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { tempCookie } from "../utils/tempCookie"

export const instance = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 10000,
})

instance.interceptors.request.use(
    (config) => {
        const token = tempCookie.getAccessToken()
        if (token && config.headers) {
            config.headers["Authorization"] = token
        }
        return config
    },
    (error) => Promise.reject(error)
)

instance.interceptors.response.use(
    (response) => response,
    async (
        error: AxiosError & {
            config: AxiosRequestConfig & { _retry?: boolean }
        }
    ) => {
        const originalRequest = error.config
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true
            const refreshToken = tempCookie.getRefreshToken()
            if (refreshToken) {
                try {
                    const response = await axios.post(
                        "http://localhost:8080/auth/refresh-token",
                        { token: refreshToken }
                    )
                    const newAccessToken = response.data.accessToken
                    tempCookie.setTokens(newAccessToken, refreshToken)
                    originalRequest.headers["Authorization"] =
                        tempCookie.getAccessToken()
                    return axios(originalRequest)
                } catch (err) {
                    tempCookie.clearTokens()
                    return Promise.reject(err)
                }
            }
        }
        return Promise.reject(error)
    }
)
