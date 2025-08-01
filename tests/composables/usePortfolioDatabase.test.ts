import { describe, it, expect, vi, beforeEach } from 'vitest'
import { usePortfolioDatabase } from '~/composables/usePortfolioDatabase'

// Mock global $fetch
global.$fetch = vi.fn()

describe('usePortfolioDatabase', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('fetchProjects', () => {
    it('should fetch projects successfully', async () => {
      const mockResponse = {
        success: true,
        data: [
          { id: 1, title: 'Test Project', slug: 'test-project' }
        ]
      }

      vi.mocked($fetch).mockResolvedValue(mockResponse)

      const { fetchProjects, projects, isLoading } = usePortfolioDatabase()
      
      expect(isLoading.value).toBe(false)
      
      await fetchProjects()
      
      expect($fetch).toHaveBeenCalledWith('/api/projects')
      expect(projects.value).toEqual(mockResponse.data)
      expect(isLoading.value).toBe(false)
    })

    it('should handle fetch error', async () => {
      const mockError = new Error('API Error')
      vi.mocked($fetch).mockRejectedValue(mockError)

      const { fetchProjects, projects, error, isLoading } = usePortfolioDatabase()
      
      // Clear any previous projects
      projects.value = []
      
      await fetchProjects()
      
      expect(error.value).toBe(mockError)
      expect(projects.value).toEqual([])
      expect(isLoading.value).toBe(false)
    })
  })

  describe('addProject', () => {
    it('should add project successfully', async () => {
      const mockProject = { title: 'New Project', slug: 'new-project' }
      const mockResponse = { success: true, data: { id: 1, ...mockProject } }
      const mockFetchResponse = { success: true, data: [mockResponse.data] }

      vi.mocked($fetch)
        .mockResolvedValueOnce(mockResponse) // for POST
        .mockResolvedValueOnce(mockFetchResponse) // for fetchProjects

      const { addProject, projects } = usePortfolioDatabase()
      
      const result = await addProject(mockProject)
      
      expect($fetch).toHaveBeenCalledWith('/api/projects', {
        method: 'POST',
        body: mockProject
      })
      expect(result).toBe(mockResponse)
      expect(projects.value).toEqual(mockFetchResponse.data)
    })
  })

  describe('fetchSkills', () => {
    it('should fetch skills successfully', async () => {
      const mockResponse = {
        success: true,
        data: [
          { id: 1, name: 'Vue.js', category: 'Frontend' }
        ]
      }

      vi.mocked($fetch).mockResolvedValue(mockResponse)

      const { fetchSkills, skills } = usePortfolioDatabase()
      
      await fetchSkills()
      
      expect($fetch).toHaveBeenCalledWith('/api/skills')
      expect(skills.value).toEqual(mockResponse.data)
    })
  })

  describe('skillsByCategory computed', () => {
    it('should group skills by category and sort by order', () => {
      const { skills, skillsByCategory } = usePortfolioDatabase()
      
      // Set test data
      skills.value = [
        { id: 1, name: 'Vue.js', category: 'Frontend', order: 2, visible: true },
        { id: 2, name: 'React', category: 'Frontend', order: 1, visible: true },
        { id: 3, name: 'Node.js', category: 'Backend', order: 1, visible: true },
        { id: 4, name: 'Hidden Skill', category: 'Frontend', order: 0, visible: false }
      ]
      
      const result = skillsByCategory.value
      
      expect(result.Frontend).toHaveLength(2)
      expect(result.Frontend[0].name).toBe('React') // order 1 comes first
      expect(result.Frontend[1].name).toBe('Vue.js') // order 2 comes second
      expect(result.Backend).toHaveLength(1)
      expect(result.Backend[0].name).toBe('Node.js')
    })
  })

  describe('sortedBentoBlocks computed', () => {
    it('should filter visible blocks and sort by order', () => {
      const { bentoBlocks, sortedBentoBlocks } = usePortfolioDatabase()
      
      // Set test data
      bentoBlocks.value = [
        { id: 1, type: 'profile', order: 3, visible: true },
        { id: 2, type: 'skills', order: 1, visible: true },
        { id: 3, type: 'hidden', order: 2, visible: false },
        { id: 4, type: 'projects', order: 2, visible: true }
      ]
      
      const result = sortedBentoBlocks.value
      
      expect(result).toHaveLength(3) // Only visible blocks
      expect(result[0].type).toBe('skills') // order 1
      expect(result[1].type).toBe('projects') // order 2
      expect(result[2].type).toBe('profile') // order 3
    })
  })

  describe('error handling', () => {
    it('should set loading state correctly during API calls', async () => {
      let resolvePromise: (value: any) => void
      const promise = new Promise(resolve => {
        resolvePromise = resolve
      })

      vi.mocked($fetch).mockReturnValue(promise)

      const { fetchProjects, isLoading } = usePortfolioDatabase()
      
      expect(isLoading.value).toBe(false)
      
      const fetchPromise = fetchProjects()
      expect(isLoading.value).toBe(true)
      
      resolvePromise!({ success: true, data: [] })
      await fetchPromise
      
      expect(isLoading.value).toBe(false)
    })
  })
})