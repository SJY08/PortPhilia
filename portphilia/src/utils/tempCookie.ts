// tempCookie.ts
class TempCookie {
    private accessToken: string | null
    private refreshToken: string | null

    constructor() {
        this.accessToken = null
        this.refreshToken = null
        this.loadTokens() // 새로고침 시 localStorage에서 토큰 불러오기
    }

    // 액세스 토큰과 리프래시 토큰 모두 저장
    setTokens(accessToken: string, refreshToken: string) {
        // "Bearer " 접두어 제거 후 저장하고, 필요시 getAccessToken()에서 다시 붙임
        this.accessToken = accessToken.startsWith("Bearer ")
            ? accessToken.slice(7)
            : accessToken
        this.refreshToken = refreshToken
        localStorage.setItem("accessToken", this.accessToken)
        localStorage.setItem("refreshToken", this.refreshToken)
    }

    getAccessToken(): string | null {
        if (!this.accessToken) {
            this.loadTokens()
        }
        return this.accessToken ? `Bearer ${this.accessToken}` : null
    }

    getRefreshToken(): string | null {
        if (!this.refreshToken) {
            this.loadTokens()
        }
        return this.refreshToken
    }

    loadTokens() {
        if (typeof window !== "undefined") {
            const storedAccess = localStorage.getItem("accessToken")
            const storedRefresh = localStorage.getItem("refreshToken")
            this.accessToken = storedAccess || null
            this.refreshToken = storedRefresh || null
        }
    }

    clearTokens() {
        this.accessToken = null
        this.refreshToken = null
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
    }
}

export const tempCookie: TempCookie = new TempCookie()
