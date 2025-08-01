import { vi } from 'vitest'
import { config } from '@vue/test-utils'

// Make Vue's global properties available
import { ref, computed, reactive, nextTick } from 'vue'

// Add Vue globals to the test environment
global.ref = ref
global.computed = computed  
global.reactive = reactive
global.nextTick = nextTick

// Mock $fetch globally
global.$fetch = vi.fn()

// Configure Vue Test Utils globally
config.global.mocks = {
  $fetch: vi.fn()
}