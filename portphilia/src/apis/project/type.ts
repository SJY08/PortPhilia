export interface ProjectType {
    id: string | number
    title: string
    description: string
    tech_stack: string[]
    i_do: string
}

export interface ProjectTypeWithoutId {
    title: string
    description: string
    tech_stack: string[]
    i_do: string
}
