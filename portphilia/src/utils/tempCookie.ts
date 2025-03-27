class TempCookie {
    private accessToken: string | null
    private refreshToken: string | null

    constructor() {
        this.accessToken = null
        this.refreshToken = null
        this.loadTokens()
    }

    setTokens(tokens: { accessToken: string; refreshToken: string }) {
        // accessToken이 "Bearer "로 시작할 경우 제거
        this.accessToken = tokens.accessToken.startsWith("Bearer ")
            ? tokens.accessToken.slice(7)
            : tokens.accessToken
        this.refreshToken = tokens.refreshToken
        localStorage.setItem("accessToken", this.accessToken)
        localStorage.setItem("refreshToken", this.refreshToken)
    }

    // 단일 accessToken 설정 (리프래시 토큰은 그대로 유지)
    setAccessToken(token: string) {
        this.accessToken = token.startsWith("Bearer ") ? token.slice(7) : token
        localStorage.setItem("accessToken", this.accessToken)
    }

    getAccessToken() {
        if (!this.accessToken) {
            this.loadTokens()
        }
        return this.accessToken ? `Bearer ${this.accessToken}` : null
    }

    getRefreshToken() {
        if (!this.refreshToken) {
            this.loadTokens()
        }
        return this.refreshToken
    }

    clearTokens() {
        this.accessToken = null
        this.refreshToken = null
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
    }

    loadTokens() {
        if (typeof window !== "undefined") {
            this.accessToken = localStorage.getItem("accessToken")
            this.refreshToken = localStorage.getItem("refreshToken")
        }
    }
}

export const tempCookie = new TempCookie()
