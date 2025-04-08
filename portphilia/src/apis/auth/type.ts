export interface LoginData {
    username: string
    password: string
}

export interface RegisterData {
    name: string
    username: string
    password: string
}

export interface AuthResponse {
    accessToken: string
    message: string
}
