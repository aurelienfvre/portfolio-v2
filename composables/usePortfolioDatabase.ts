import { ref, computed } from 'vue'

// State reactif global pour les données du portfolio (BDD)
const portfolioProjects = ref([])
const portfolioSkills = ref([])
const portfolioStudentYears = ref([])
const portfolioBentoBlocks = ref([])
const portfolioCompetences = ref([])
const portfolioApprentissagesCritiques = ref([])
const portfolioProfile = ref(null)
const portfolioFormations = ref([])
const portfolioStage = ref(null)
const portfolioSocialLinks = ref([])
const portfolioCustomBlocks = ref([])
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

  const fetchCompetences = async () => {
    try {
      isLoading.value = true
      const response = await $fetch('/api/competences')
      if (response.success) {
        portfolioCompetences.value = response.data
      }
    } catch (err) {
      error.value = err
      console.error('Error fetching competences:', err)
    } finally {
      isLoading.value = false
    }
  }

  const fetchApprentissagesCritiques = async () => {
    try {
      isLoading.value = true
      const response = await $fetch('/api/apprentissages-critiques')
      if (response.success) {
        portfolioApprentissagesCritiques.value = response.data
      }
    } catch (err) {
      error.value = err
      console.error('Error fetching apprentissages critiques:', err)
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

  // Profile Management avec API
  const fetchProfile = async () => {
    try {
      isLoading.value = true
      const response = await $fetch('/api/profile')
      if (response.success) {
        portfolioProfile.value = response.data
      }
    } catch (err) {
      error.value = err
      console.error('Error fetching profile:', err)
    } finally {
      isLoading.value = false
    }
  }

  const updateProfile = async (profileData: any) => {
    try {
      isLoading.value = true
      const response = await $fetch('/api/profile', {
        method: 'PUT',
        body: profileData
      })
      if (response.success) {
        portfolioProfile.value = response.data
      }
      return response
    } catch (err) {
      error.value = err
      console.error('Error updating profile:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Formations Management avec API
  const fetchFormations = async () => {
    try {
      isLoading.value = true
      const response = await $fetch('/api/formations')
      if (response.success) {
        portfolioFormations.value = response.data
      }
    } catch (err) {
      error.value = err
      console.error('Error fetching formations:', err)
    } finally {
      isLoading.value = false
    }
  }

  const addFormation = async (formation: any) => {
    try {
      isLoading.value = true
      const response = await $fetch('/api/formations', {
        method: 'POST',
        body: formation
      })
      if (response.success) {
        await fetchFormations() // Refresh list
      }
      return response
    } catch (err) {
      error.value = err
      console.error('Error adding formation:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const updateFormation = async (formationId: number, updatedFormation: any) => {
    try {
      isLoading.value = true
      const response = await $fetch(`/api/formations/${formationId}`, {
        method: 'PUT',
        body: updatedFormation
      })
      if (response.success) {
        await fetchFormations() // Refresh list
      }
      return response
    } catch (err) {
      error.value = err
      console.error('Error updating formation:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const deleteFormation = async (formationId: number) => {
    try {
      isLoading.value = true
      await $fetch(`/api/formations/${formationId}`, {
        method: 'DELETE'
      })
      await fetchFormations() // Refresh list
    } catch (err) {
      error.value = err
      console.error('Error deleting formation:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Stage Management avec API
  const fetchStage = async () => {
    try {
      isLoading.value = true
      const response = await $fetch('/api/stage')
      if (response.success) {
        portfolioStage.value = response.data
      }
    } catch (err) {
      error.value = err
      console.error('Error fetching stage:', err)
    } finally {
      isLoading.value = false
    }
  }

  const updateStage = async (stageData: any) => {
    try {
      isLoading.value = true
      const response = await $fetch('/api/stage', {
        method: 'PUT',
        body: stageData
      })
      if (response.success) {
        portfolioStage.value = response.data
      }
      return response
    } catch (err) {
      error.value = err
      console.error('Error updating stage:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Social Links Management avec API
  const fetchSocialLinks = async () => {
    try {
      isLoading.value = true
      const response = await $fetch('/api/social-links')
      if (response.success) {
        portfolioSocialLinks.value = response.data
      }
    } catch (err) {
      error.value = err
      console.error('Error fetching social links:', err)
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
    
    // Trier chaque catégorie par ordre
    Object.keys(categories).forEach(category => {
      categories[category].sort((a, b) => (a.order || 0) - (b.order || 0))
    })
    
    return categories
  })

  // Initialisation des données
  const initializeData = async () => {
    await Promise.all([
      fetchProjects(),
      fetchSkills(),
      fetchBentoBlocks(),
      fetchStudentYears(),
      fetchProfile(),
      fetchFormations(),
      fetchStage(),
      fetchSocialLinks(),
      fetchCustomBlocks()
    ])
  }

  // Custom Blocks Management
  const fetchCustomBlocks = async () => {
    try {
      isLoading.value = true
      const response = await $fetch('/api/custom-blocks')
      if (response.success) {
        portfolioCustomBlocks.value = response.data
      }
    } catch (err) {
      error.value = err
      console.error('Error fetching custom blocks:', err)
    } finally {
      isLoading.value = false
    }
  }

  const addCustomBlock = async (block: any) => {
    try {
      isLoading.value = true
      const response = await $fetch('/api/custom-blocks', {
        method: 'POST',
        body: block
      })
      if (response.success) {
        await fetchCustomBlocks() // Refresh list
      }
      return response
    } catch (err) {
      error.value = err
      console.error('Error adding custom block:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const updateCustomBlock = async (id: number, block: any) => {
    try {
      isLoading.value = true
      const response = await $fetch(`/api/custom-blocks/${id}`, {
        method: 'PUT',
        body: block
      })
      if (response.success) {
        await fetchCustomBlocks() // Refresh list
      }
      return response
    } catch (err) {
      error.value = err
      console.error('Error updating custom block:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const deleteCustomBlock = async (id: number) => {
    try {
      isLoading.value = true
      const response = await $fetch(`/api/custom-blocks/${id}`, {
        method: 'DELETE'
      })
      if (response.success) {
        await fetchCustomBlocks() // Refresh list
      }
      return response
    } catch (err) {
      error.value = err
      console.error('Error deleting custom block:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    // Data
    projects: portfolioProjects,
    skills: portfolioSkills,
    studentYears: portfolioStudentYears,
    bentoBlocks: portfolioBentoBlocks,
    competences: portfolioCompetences,
    apprentissagesCritiques: portfolioApprentissagesCritiques,
    profile: portfolioProfile,
    formations: portfolioFormations,
    stage: portfolioStage,
    socialLinks: portfolioSocialLinks,
    customBlocks: portfolioCustomBlocks,
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
    fetchCompetences,
    fetchApprentissagesCritiques,
    updateStudentAC,
    
    // Profile & Static Data
    fetchProfile,
    updateProfile,
    fetchFormations,
    addFormation,
    updateFormation,
    deleteFormation,
    fetchStage,
    updateStage,
    fetchSocialLinks,
    
    // Custom Blocks
    fetchCustomBlocks,
    addCustomBlock,
    updateCustomBlock,
    deleteCustomBlock,
    
    // Init
    initializeData
  }
}