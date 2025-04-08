// src/utils/tempCookie.ts
class TempCookie {
    private accessToken: string | null

    constructor() {
        this.accessToken = null
        this.loadTokens()
    }

    setAccessToken(token: string) {
        this.accessToken = token.startsWith("Bearer ") ? token.slice(7) : token
        localStorage.setItem("accessToken", this.accessToken)
    }

    getAccessToken(): string | null {
        if (!this.accessToken) {
            this.loadTokens()
        }
        return this.accessToken ? `Bearer ${this.accessToken}` : null
    }

    clearTokens() {
        this.accessToken = null
        localStorage.removeItem("accessToken")
    }

    loadTokens() {
        if (typeof window !== "undefined") {
            this.accessToken = localStorage.getItem("accessToken")
        }
    }
}

export const tempCookie = new TempCookie()
