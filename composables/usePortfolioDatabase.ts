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

// Nouveau système Compétence/Preuve
const portfolioMainCompetences = ref([])
const portfolioProofCategories = ref([])
const portfolioProofItems = ref([])

const isLoading = ref(false)
const error = ref(null)

export const usePortfolioDatabase = () => {
  // Projects Management avec API
  const fetchProjects = async () => {
    try {
      isLoading.value = true
      const response = await $fetch('/api/projects')
      if (response.success) {
        // L'API parse déjà les champs JSON, plus besoin de le faire ici
        portfolioProjects.value = response.data
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

  const updateContact = async (contactData: any) => {
    try {
      isLoading.value = true
      const response = await $fetch('/api/profile', {
        method: 'PUT',
        body: {
          ...portfolioProfile.value,
          ...contactData
        }
      })
      if (response.success) {
        portfolioProfile.value = response.data
      }
      return response
    } catch (err) {
      error.value = err
      console.error('Error updating contact:', err)
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
    portfolioSkills.value
      .filter(skill => skill.visible !== false) // Filter only visible skills
      .forEach(skill => {
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

  // ===================================================================
  // NOUVEAU SYSTÈME COMPÉTENCE/PREUVE
  // ===================================================================

  // Main Competences Management
  const fetchMainCompetences = async () => {
    try {
      isLoading.value = true
      const response = await $fetch('/api/main-competences')
      if (response.success) {
        portfolioMainCompetences.value = response.data
      }
    } catch (err) {
      error.value = err
      console.error('Error fetching main competences:', err)
    } finally {
      isLoading.value = false
    }
  }

  const addMainCompetence = async (competence: any) => {
    try {
      isLoading.value = true
      const response = await $fetch('/api/main-competences', {
        method: 'POST',
        body: competence
      })
      if (response.success) {
        await fetchMainCompetences() // Refresh list
      }
      return response
    } catch (err) {
      error.value = err
      console.error('Error adding main competence:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const updateMainCompetence = async (competenceId: number, updatedCompetence: any) => {
    try {
      isLoading.value = true
      const response = await $fetch(`/api/main-competences/${competenceId}`, {
        method: 'PUT',
        body: updatedCompetence
      })
      if (response.success) {
        await fetchMainCompetences() // Refresh list
      }
      return response
    } catch (err) {
      error.value = err
      console.error('Error updating main competence:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const deleteMainCompetence = async (competenceId: number) => {
    try {
      isLoading.value = true
      await $fetch(`/api/main-competences/${competenceId}`, {
        method: 'DELETE'
      })
      await fetchMainCompetences() // Refresh list
    } catch (err) {
      error.value = err
      console.error('Error deleting main competence:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Proof Categories Management
  const fetchProofCategories = async (mainCompetenceId?: number) => {
    try {
      isLoading.value = true
      const url = mainCompetenceId 
        ? `/api/proof-categories?mainCompetenceId=${mainCompetenceId}`
        : '/api/proof-categories'
      const response = await $fetch(url)
      if (response.success) {
        portfolioProofCategories.value = response.data
      }
    } catch (err) {
      error.value = err
      console.error('Error fetching proof categories:', err)
    } finally {
      isLoading.value = false
    }
  }

  const addProofCategory = async (category: any) => {
    try {
      isLoading.value = true
      const response = await $fetch('/api/proof-categories', {
        method: 'POST',
        body: category
      })
      if (response.success) {
        await fetchProofCategories() // Refresh list
      }
      return response
    } catch (err) {
      error.value = err
      console.error('Error adding proof category:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const updateProofCategory = async (categoryId: number, updatedCategory: any) => {
    try {
      isLoading.value = true
      const response = await $fetch(`/api/proof-categories/${categoryId}`, {
        method: 'PUT',
        body: updatedCategory
      })
      if (response.success) {
        await fetchProofCategories() // Refresh list
      }
      return response
    } catch (err) {
      error.value = err
      console.error('Error updating proof category:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const deleteProofCategory = async (categoryId: number) => {
    try {
      isLoading.value = true
      await $fetch(`/api/proof-categories/${categoryId}`, {
        method: 'DELETE'
      })
      await fetchProofCategories() // Refresh list
    } catch (err) {
      error.value = err
      console.error('Error deleting proof category:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const reorderProofCategories = async (reorderData: { id: number, order: number }[]) => {
    try {
      isLoading.value = true
      const response = await $fetch('/api/proof-categories/reorder', {
        method: 'PATCH',
        body: reorderData
      })
      if (response.success) {
        await fetchProofCategories() // Refresh list
      }
      return response
    } catch (err) {
      error.value = err
      console.error('Error reordering proof categories:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Proof Items Management
  const fetchProofItems = async (proofCategoryId?: number) => {
    try {
      isLoading.value = true
      const url = proofCategoryId 
        ? `/api/proof-items?proofCategoryId=${proofCategoryId}`
        : '/api/proof-items'
      const response = await $fetch(url)
      if (response.success) {
        portfolioProofItems.value = response.data
      }
    } catch (err) {
      error.value = err
      console.error('Error fetching proof items:', err)
    } finally {
      isLoading.value = false
    }
  }

  const addProofItem = async (item: any) => {
    try {
      isLoading.value = true
      const response = await $fetch('/api/proof-items', {
        method: 'POST',
        body: item
      })
      if (response.success) {
        await fetchProofItems() // Refresh list
      }
      return response
    } catch (err) {
      error.value = err
      console.error('Error adding proof item:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const updateProofItem = async (itemId: number, updatedItem: any) => {
    try {
      isLoading.value = true
      const response = await $fetch(`/api/proof-items/${itemId}`, {
        method: 'PUT',
        body: updatedItem
      })
      if (response.success) {
        await fetchProofItems() // Refresh list
      }
      return response
    } catch (err) {
      error.value = err
      console.error('Error updating proof item:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const deleteProofItem = async (itemId: number) => {
    try {
      isLoading.value = true
      await $fetch(`/api/proof-items/${itemId}`, {
        method: 'DELETE'
      })
      await fetchProofItems() // Refresh list
    } catch (err) {
      error.value = err
      console.error('Error deleting proof item:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const reorderProofItems = async (reorderData: { id: number, order: number }[]) => {
    try {
      isLoading.value = true
      const response = await $fetch('/api/proof-items/reorder', {
        method: 'PATCH',
        body: reorderData
      })
      if (response.success) {
        await fetchProofItems() // Refresh list
      }
      return response
    } catch (err) {
      error.value = err
      console.error('Error reordering proof items:', err)
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
    
    // Nouveau système Compétence/Preuve
    mainCompetences: portfolioMainCompetences,
    proofCategories: portfolioProofCategories,
    proofItems: portfolioProofItems,
    
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
    
    // Student (ancien système)
    fetchStudentYears,
    fetchCompetences,
    fetchApprentissagesCritiques,
    updateStudentAC,
    
    // Nouveau système Compétence/Preuve
    fetchMainCompetences,
    addMainCompetence,
    updateMainCompetence,
    deleteMainCompetence,
    fetchProofCategories,
    addProofCategory,
    updateProofCategory,
    deleteProofCategory,
    reorderProofCategories,
    fetchProofItems,
    addProofItem,
    updateProofItem,
    deleteProofItem,
    reorderProofItems,
    
    // Profile & Static Data
    fetchProfile,
    updateProfile,
    updateContact,
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