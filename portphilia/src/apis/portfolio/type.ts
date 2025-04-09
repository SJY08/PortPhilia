export interface Portfolio {
    id: number
    username: string
    password: string
    name: string
    birth_date?: string
    phone_number?: string
    email?: string
    education?: string
    short_intro?: string
    bio?: string
    tech_stack?: string[]
    certifications?: string[]
    profile_image_url?: string
}

export type UpdatePortfolio = Omit<Portfolio, "id" | "password">
