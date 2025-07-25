import { ref, computed } from 'vue'

// State reactif global pour les données du portfolio (BDD)
const portfolioProjects = ref([])
const portfolioSkills = ref([])
const portfolioStudentYears = ref([])
const portfolioBentoBlocks = ref([])
const isLoading = ref(false)
const error = ref(null)

export const usePortfolioDatabase = () => {
  // Projects Management avec API
  const fetchProjects = async () => {
    try {
      isLoading.value = true
      const response = await $fetch('/api/projects')
      if (response.success) {
        portfolioProjects.value = response.data.map((project: any) => ({
          ...project,
          technologies: typeof project.technologies === 'string' ? JSON.parse(project.technologies || '[]') : project.technologies,
          tags: typeof project.tags === 'string' ? JSON.parse(project.tags || '[]') : project.tags
        }))
      }
    } catch (err) {
      error.value = err
      console.error('Error fetching projects:', err)
    } finally {
      isLoading.value = false
    }
  }

  const addProject = async (project: any) => {
    try {
      isLoading.value = true
      const response = await $fetch('/api/projects', {
        method: 'POST',
        body: project
      })
      if (response.success) {
        await fetchProjects() // Refresh list
      }
      return response
    } catch (err) {
      error.value = err
      console.error('Error adding project:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const updateProject = async (projectId: string, updatedProject: any) => {
    try {
      isLoading.value = true
      const response = await $fetch(`/api/projects/${projectId}`, {
        method: 'PUT',
        body: updatedProject
      })
      if (response.success) {
        await fetchProjects() // Refresh list
      }
      return response
    } catch (err) {
      error.value = err
      console.error('Error updating project:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const deleteProject = async (projectId: string) => {
    try {
      isLoading.value = true
      await $fetch(`/api/projects/${projectId}`, {
        method: 'DELETE'
      })
      await fetchProjects() // Refresh list
    } catch (err) {
      error.value = err
      console.error('Error deleting project:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Skills Management avec API
  const fetchSkills = async () => {
    try {
      isLoading.value = true
      const response = await $fetch('/api/skills')
      if (response.success) {
        portfolioSkills.value = response.data
      }
    } catch (err) {
      error.value = err
      console.error('Error fetching skills:', err)
    } finally {
      isLoading.value = false
    }
  }

  const addSkill = async (skill: any) => {
    try {
      isLoading.value = true
      const response = await $fetch('/api/skills', {
        method: 'POST',
        body: skill
      })
      if (response.success) {
        await fetchSkills() // Refresh list
      }
      return response
    } catch (err) {
      error.value = err
      console.error('Error adding skill:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const updateSkill = async (skillId: number, updatedSkill: any) => {
    try {
      isLoading.value = true
      const response = await $fetch(`/api/skills/${skillId}`, {
        method: 'PUT',
        body: updatedSkill
      })
      if (response.success) {
        await fetchSkills() // Refresh list
      }
      return response
    } catch (err) {
      error.value = err
      console.error('Error updating skill:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const deleteSkill = async (skillId: number) => {
    try {
      isLoading.value = true
      await $fetch(`/api/skills/${skillId}`, {
        method: 'DELETE'
      })
      await fetchSkills() // Refresh list
    } catch (err) {
      error.value = err
      console.error('Error deleting skill:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Bento Blocks Management avec API
  const fetchBentoBlocks = async () => {
    try {
      isLoading.value = true
      const response = await $fetch('/api/bento-blocks')
      if (response.success) {
        portfolioBentoBlocks.value = response.data.map((block: any) => ({
          ...block,
          props: typeof block.props === 'string' ? JSON.parse(block.props || '{}') : block.props
        }))
      }
    } catch (err) {
      error.value = err
      console.error('Error fetching bento blocks:', err)
    } finally {
      isLoading.value = false
    }
  }

  const addBentoBlock = async (block: any) => {
    try {
      isLoading.value = true
      const response = await $fetch('/api/bento-blocks', {
        method: 'POST',
        body: block
      })
      if (response.success) {
        await fetchBentoBlocks() // Refresh list
      }
      return response
    } catch (err) {
      error.value = err
      console.error('Error adding bento block:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const updateBentoBlock = async (blockId: number, updatedBlock: any) => {
    try {
      isLoading.value = true
      const response = await $fetch(`/api/bento-blocks/${blockId}`, {
        method: 'PUT',
        body: updatedBlock
      })
      if (response.success) {
        await fetchBentoBlocks() // Refresh list
      }
      return response
    } catch (err) {
      error.value = err
      console.error('Error updating bento block:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const deleteBentoBlock = async (blockId: number) => {
    try {
      isLoading.value = true
      await $fetch(`/api/bento-blocks/${blockId}`, {
        method: 'DELETE'
      })
      await fetchBentoBlocks() // Refresh list
    } catch (err) {
      error.value = err
      console.error('Error deleting bento block:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Student Years Management avec API
  const fetchStudentYears = async () => {
    try {
      isLoading.value = true
      const response = await $fetch('/api/student-years')
      if (response.success) {
        portfolioStudentYears.value = response.data
      }
    } catch (err) {
      error.value = err
      console.error('Error fetching student years:', err)
    } finally {
      isLoading.value = false
    }
  }

  const updateStudentAC = async (yearId: number, acUpdates: any[]) => {
    try {
      isLoading.value = true
      await $fetch(`/api/student-years/${yearId}/ac`, {
        method: 'PUT',
        body: { acUpdates }
      })
      await fetchStudentYears() // Refresh list
    } catch (err) {
      error.value = err
      console.error('Error updating student AC:', err)
      throw err
    } finally {
      isLoading.value = false
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

  // Initialisation des données
  const initializeData = async () => {
    await Promise.all([
      fetchProjects(),
      fetchSkills(),
      fetchBentoBlocks(),
      fetchStudentYears()
    ])
  }

  return {
    // Data
    projects: portfolioProjects,
    skills: portfolioSkills,
    studentYears: portfolioStudentYears,
    bentoBlocks: portfolioBentoBlocks,
    isLoading,
    error,
    
    // Computed
    sortedBentoBlocks,
    skillsByCategory,
    
    // Projects
    fetchProjects,
    addProject,
    updateProject,
    deleteProject,
    
    // Skills
    fetchSkills,
    addSkill,
    updateSkill,
    deleteSkill,
    
    // Bento
    fetchBentoBlocks,
    addBentoBlock,
    updateBentoBlock,
    deleteBentoBlock,
    
    // Student
    fetchStudentYears,
    updateStudentAC,
    
    // Init
    initializeData
  }
}