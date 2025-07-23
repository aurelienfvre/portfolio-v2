import { ref, computed } from 'vue'
import { projects as initialProjects } from '~/data/projects'
import { skills as initialSkills } from '~/data/skills'
import { studentYears as initialStudentYears } from '~/data/student-data'

// State reactif global pour les données du portfolio
const portfolioProjects = ref([...initialProjects])
const portfolioSkills = ref([...initialSkills])
const portfolioStudentYears = ref([...initialStudentYears])
const portfolioBentoBlocks = ref([
  { id: 1, title: 'Photo Profil', type: 'Image', colSpan: 3, gradient: 'from-blue-500 to-purple-600', order: 1, component: 'ProfileSection', visible: true },
  { id: 2, title: 'Introduction', type: 'Text', colSpan: 6, gradient: 'from-green-500 to-blue-500', order: 2, component: 'IntroSection', visible: true },
  { id: 3, title: 'Stage', type: 'Info', colSpan: 3, gradient: 'from-yellow-500 to-red-500', order: 3, component: 'StageSection', visible: true },
  { id: 4, title: 'Liens', type: 'Social', colSpan: 4, gradient: 'from-purple-500 to-pink-500', order: 4, component: 'LinksSection', visible: true },
  { id: 5, title: 'Formation', type: 'Timeline', colSpan: 4, gradient: 'from-indigo-500 to-purple-500', order: 5, component: 'FormationSection', visible: true },
  { id: 6, title: 'Compétences', type: 'Skills', colSpan: 4, gradient: 'from-teal-500 to-green-500', order: 6, component: 'SkillsSection', visible: true },
  { id: 7, title: 'Projets', type: 'Portfolio', colSpan: 8, gradient: 'from-orange-500 to-red-500', order: 7, component: 'ProjectsSection', visible: true },
  { id: 8, title: 'Contact', type: 'Form', colSpan: 4, gradient: 'from-pink-500 to-rose-500', order: 8, component: 'ContactSection', visible: true }
])

export const usePortfolioData = () => {
  // Projects Management
  const addProject = (project: any) => {
    portfolioProjects.value.push({
      ...project,
      id: project.id || `project-${Date.now()}`
    })
    saveToLocalStorage()
  }

  const updateProject = (projectId: string, updatedProject: any) => {
    const index = portfolioProjects.value.findIndex(p => p.id === projectId)
    if (index !== -1) {
      portfolioProjects.value[index] = { ...updatedProject, id: projectId }
      saveToLocalStorage()
    }
  }

  const deleteProject = (projectId: string) => {
    portfolioProjects.value = portfolioProjects.value.filter(p => p.id !== projectId)
    saveToLocalStorage()
  }

  // Skills Management
  const addSkill = (skill: any) => {
    portfolioSkills.value.push(skill)
    saveToLocalStorage()
  }

  const updateSkill = (skillName: string, updatedSkill: any) => {
    const index = portfolioSkills.value.findIndex(s => s.name === skillName)
    if (index !== -1) {
      portfolioSkills.value[index] = updatedSkill
      saveToLocalStorage()
    }
  }

  const deleteSkill = (skillName: string) => {
    portfolioSkills.value = portfolioSkills.value.filter(s => s.name !== skillName)
    saveToLocalStorage()
  }

  // Bento Blocks Management
  const addBentoBlock = (block: any) => {
    const newId = Math.max(...portfolioBentoBlocks.value.map(b => b.id || 0)) + 1
    portfolioBentoBlocks.value.push({
      ...block,
      id: newId
    })
    saveToLocalStorage()
  }

  const updateBentoBlock = (blockId: number, updatedBlock: any) => {
    const index = portfolioBentoBlocks.value.findIndex(b => b.id === blockId)
    if (index !== -1) {
      portfolioBentoBlocks.value[index] = { ...updatedBlock, id: blockId }
      saveToLocalStorage()
    }
  }

  const deleteBentoBlock = (blockId: number) => {
    portfolioBentoBlocks.value = portfolioBentoBlocks.value.filter(b => b.id !== blockId)
    saveToLocalStorage()
  }

  // Student Years Management
  const addStudentAC = (yearIndex: number, competenceIndex: number, ac: any) => {
    if (portfolioStudentYears.value[yearIndex]?.skills[competenceIndex]) {
      portfolioStudentYears.value[yearIndex].skills[competenceIndex].ac.push(ac)
      saveToLocalStorage()
    }
  }

  const updateStudentAC = (yearIndex: number, competenceIndex: number, acIndex: number, updatedAC: any) => {
    if (portfolioStudentYears.value[yearIndex]?.skills[competenceIndex]?.ac[acIndex]) {
      portfolioStudentYears.value[yearIndex].skills[competenceIndex].ac[acIndex] = updatedAC
      saveToLocalStorage()
    }
  }

  const deleteStudentAC = (yearIndex: number, competenceIndex: number, acIndex: number) => {
    if (portfolioStudentYears.value[yearIndex]?.skills[competenceIndex]?.ac) {
      portfolioStudentYears.value[yearIndex].skills[competenceIndex].ac.splice(acIndex, 1)
      saveToLocalStorage()
    }
  }

  // Persistence
  const saveToLocalStorage = () => {
    if (process.client) {
      const data = {
        projects: portfolioProjects.value,
        skills: portfolioSkills.value,
        studentYears: portfolioStudentYears.value,
        bentoBlocks: portfolioBentoBlocks.value,
        lastUpdated: new Date().toISOString()
      }
      localStorage.setItem('portfolio-data', JSON.stringify(data))
    }
  }

  const loadFromLocalStorage = () => {
    if (process.client) {
      try {
        const saved = localStorage.getItem('portfolio-data')
        if (saved) {
          const data = JSON.parse(saved)
          if (data.projects) portfolioProjects.value = data.projects
          if (data.skills) portfolioSkills.value = data.skills
          if (data.studentYears) portfolioStudentYears.value = data.studentYears
          if (data.bentoBlocks) portfolioBentoBlocks.value = data.bentoBlocks
        }
      } catch (error) {
        console.warn('Error loading portfolio data from localStorage:', error)
      }
    }
  }

  const resetToDefaults = () => {
    portfolioProjects.value = [...initialProjects]
    portfolioSkills.value = [...initialSkills]
    portfolioStudentYears.value = [...initialStudentYears]
    if (process.client) {
      localStorage.removeItem('portfolio-data')
    }
  }

  const exportData = () => {
    const data = {
      projects: portfolioProjects.value,
      skills: portfolioSkills.value,
      studentYears: portfolioStudentYears.value,
      bentoBlocks: portfolioBentoBlocks.value,
      exportedAt: new Date().toISOString()
    }
    return data
  }

  const importData = (data: any) => {
    try {
      if (data.projects) portfolioProjects.value = data.projects
      if (data.skills) portfolioSkills.value = data.skills
      if (data.studentYears) portfolioStudentYears.value = data.studentYears
      if (data.bentoBlocks) portfolioBentoBlocks.value = data.bentoBlocks
      saveToLocalStorage()
      return true
    } catch (error) {
      console.error('Error importing data:', error)
      return false
    }
  }

  // Computed getters
  const sortedBentoBlocks = computed(() => {
    return [...portfolioBentoBlocks.value]
      .filter(block => block.visible)
      .sort((a, b) => (a.order || 0) - (b.order || 0))
  })

  const skillsByCategory = computed(() => {
    const categories: Record<string, any[]> = {}
    portfolioSkills.value.forEach(skill => {
      const category = skill.category || 'Autres'
      if (!categories[category]) {
        categories[category] = []
      }
      categories[category].push(skill)
    })
    return categories
  })

  return {
    // Data
    projects: portfolioProjects,
    skills: portfolioSkills,
    studentYears: portfolioStudentYears,
    bentoBlocks: portfolioBentoBlocks,
    
    // Computed
    sortedBentoBlocks,
    skillsByCategory,
    
    // Projects
    addProject,
    updateProject,
    deleteProject,
    
    // Skills
    addSkill,
    updateSkill,
    deleteSkill,
    
    // Bento
    addBentoBlock,
    updateBentoBlock,
    deleteBentoBlock,
    
    // Student
    addStudentAC,
    updateStudentAC,
    deleteStudentAC,
    
    // Persistence
    saveToLocalStorage,
    loadFromLocalStorage,
    resetToDefaults,
    exportData,
    importData
  }
}