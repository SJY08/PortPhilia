import axios, {
    AxiosError,
    InternalAxiosRequestConfig,
    AxiosResponse,
} from "axios"
import { tempCookie } from "../utils/tempCookie"

const BASEURL = "http://localhost:3000"

const instance = axios.create({
    baseURL: BASEURL,
    timeout: 10000,
    withCredentials: true,
})

instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = tempCookie.getAccessToken()
        if (token) {
            if (config.headers && typeof config.headers.set === "function") {
                config.headers.set("Authorization", token)
            } else {
                ;(config.headers as any)["Authorization"] = token
            }
        }
        return config
    },
    (error: AxiosError) => Promise.reject(error)
)

instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        return Promise.reject(error)
    }
)

export { instance }
