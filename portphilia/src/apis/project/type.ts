export interface Project {
    title: string
    description: string
    link: string
    tech_stack: string[]
}

export interface UpdateProject extends Project {
    id: string
}
