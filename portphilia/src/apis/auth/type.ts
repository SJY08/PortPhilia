export interface Login {
    username: string
    password: string
}

export interface LoginResponse {
    message: string
    accessToken: string
    refreshToken: string
}

export interface Register {
    name: string
    username: string
    password: string
}

export interface RegisterResponse {
    message: string
}
