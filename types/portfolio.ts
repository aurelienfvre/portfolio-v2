export interface PortfolioConfig {
  mode: 'pro' | 'student'
  title: string
  description: string
  navigation: Array<{
    name: string
    path: string
  }>
  seo: {
    title: string
    description: string
    keywords: string
  }
}

export interface StudentYear {
  year: number
  title: string
  skills: StudentSkill[]
  projects?: StudentProject[]
  internships?: StudentInternship[]
}

export interface StudentSkill {
  name: string
  code: string
  ac: StudentAC[]
}

export interface StudentAC {
  title: string
  description: string
  project?: string
  image?: string
}

export interface StudentProject {
  title: string
  description: string
  image?: string
  technologies?: string[]
}

export interface StudentInternship {
  title: string
  company: string
  description: string
  image?: string
  duration: string
}