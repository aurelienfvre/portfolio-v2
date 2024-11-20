export interface ProjectLink {
    type: 'github' | 'website';
    url: string;
    label?: string;  // Pour différencier plusieurs repos par exemple
}

export interface Technology {
    name: string;
    icon?: string;
    invert?: boolean;
}

export interface Project {
    id: string
    title: string
    description: string
    image: string
    technologies: Technology[]
    videoUrl?: string
    detailedContent: string
    links?: {
        website?: string
        github?: string[] // tableau pour gérer plusieurs repos
    }
}