export interface Technology {
    name: string
    icon?: string
    invert?: boolean
}

export interface Project {
    id: string
    title: string
    description: string
    image: string
    technologies: Technology[]
    videoUrl?: string
    detailedContent: string
    link?: string
}