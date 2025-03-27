import { useMutation } from "@tanstack/react-query"
import { instance } from ".."
import { tempCookie } from "../../utils/tempCookie"
import { Login, LoginResponse, Register, RegisterResponse } from "./type"

const router = "/auth"

export const useLogin = () => {
    return useMutation<LoginResponse, Error, Login>({
        mutationFn: async (param: Login) => {
            const response = await instance.post(`${router}/login`, param)
            const data = response.data
            tempCookie.setTokens(data.accessToken, data.refreshToken)
            return data
        },
    })
}

export const useRegister = () => {
    return useMutation<RegisterResponse, Error, Register>({
        mutationFn: async (param: Register) => {
            const response = await instance.post(`${router}/register`, param)
            return response.data
        },
    })
}

export const useLogout = () => {
    return useMutation<void, Error, { refreshToken: string }>({
        mutationFn: async (param) => {
            await instance.post(`${router}/logout`, param)
            tempCookie.clearTokens()
        },
    })
}
