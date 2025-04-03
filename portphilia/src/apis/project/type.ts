export interface Project {
    id?: number // 서버에서 생성되는 id (있을 경우)
    title: string
    description: string // 서버에서는 'description' 컬럼을 사용합니다.
    link: string
    tech_stack: string[]
    i_do: string
}
