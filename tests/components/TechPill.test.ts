import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TechPill from '~/components/common/TechPill.vue'

// Mock the useTheme composable
const mockTheme = vi.fn().mockReturnValue({ value: 'light' })
vi.mock('~/composables/useTheme', () => ({
  useTheme: () => ({
    theme: mockTheme()
  })
}))

describe('TechPill', () => {
  it('should render label correctly', () => {
    const wrapper = mount(TechPill, {
      props: {
        label: 'Vue.js'
      }
    })

    expect(wrapper.text()).toContain('Vue.js')
  })

  it('should render single icon when provided', () => {
    const wrapper = mount(TechPill, {
      props: {
        label: 'Vue.js',
        icon: '/icons/vue.svg'
      }
    })

    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('/icons/vue.svg')
    expect(img.attributes('alt')).toBe('Vue.js')
  })

  it('should render light icon in light theme when hasDarkVersion is true', () => {
    mockTheme.mockReturnValue({ value: 'light' })
    
    const wrapper = mount(TechPill, {
      props: {
        label: 'Vue.js',
        iconLight: '/icons/vue-light.svg',
        iconDark: '/icons/vue-dark.svg',
        hasDarkVersion: true
      }
    })

    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe('/icons/vue-light.svg')
  })

  it('should render dark icon in dark theme when hasDarkVersion is true', () => {
    mockTheme.mockReturnValue({ value: 'dark' })
    
    const wrapper = mount(TechPill, {
      props: {
        label: 'Vue.js',
        iconLight: '/icons/vue-light.svg',
        iconDark: '/icons/vue-dark.svg',
        hasDarkVersion: true
      }
    })

    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe('/icons/vue-dark.svg')
  })

  it('should apply invert class when invert prop is true and in dark theme', () => {
    mockTheme.mockReturnValue({ value: 'dark' })
    
    const wrapper = mount(TechPill, {
      props: {
        label: 'Vue.js',
        icon: '/icons/vue.svg',
        invert: true
      }
    })

    const img = wrapper.find('img')
    expect(img.classes()).toContain('dark:filter')
    expect(img.classes()).toContain('dark:brightness-0')
    expect(img.classes()).toContain('dark:invert')
  })

  it('should not apply invert class when invert prop is false', () => {
    const wrapper = mount(TechPill, {
      props: {
        label: 'Vue.js',
        icon: '/icons/vue.svg',
        invert: false
      }
    })

    const img = wrapper.find('img')
    expect(img.classes()).not.toContain('dark:filter')
  })

  it('should render prefix slot content', () => {
    const wrapper = mount(TechPill, {
      props: {
        label: 'Vue.js'
      },
      slots: {
        prefix: '<span class="prefix">★</span>'
      }
    })

    expect(wrapper.find('.prefix').exists()).toBe(true)
    expect(wrapper.text()).toContain('★')
  })

  it('should render default slot content', () => {
    const wrapper = mount(TechPill, {
      props: {
        label: 'Vue.js'
      },
      slots: {
        default: '<span class="suffix">v3</span>'
      }
    })

    expect(wrapper.find('.suffix').exists()).toBe(true)
    expect(wrapper.text()).toContain('v3')
  })

  it('should have correct CSS classes', () => {
    const wrapper = mount(TechPill, {
      props: {
        label: 'Vue.js'
      }
    })

    const span = wrapper.find('span')
    expect(span.classes()).toContain('inline-flex')
    expect(span.classes()).toContain('items-center')
    expect(span.classes()).toContain('gap-1.5')
    expect(span.classes()).toContain('px-3')
    expect(span.classes()).toContain('py-1.5')
    expect(span.classes()).toContain('text-sm')
    expect(span.classes()).toContain('border')
    expect(span.classes()).toContain('border-border-primary')
    expect(span.classes()).toContain('rounded-full')
    expect(span.classes()).toContain('transition-all')
  })

  it('should prioritize hasDarkVersion over single icon', () => {
    mockTheme.mockReturnValue({ value: 'light' })
    
    const wrapper = mount(TechPill, {
      props: {
        label: 'Vue.js',
        icon: '/icons/vue.svg',
        iconLight: '/icons/vue-light.svg',
        iconDark: '/icons/vue-dark.svg',
        hasDarkVersion: true
      }
    })

    const img = wrapper.find('img')
    // Should use iconLight/iconDark instead of icon when hasDarkVersion is true
    expect(img.attributes('src')).not.toBe('/icons/vue.svg')
    expect(img.attributes('src')).toBe('/icons/vue-light.svg') // light theme should use light icon
  })

  it('should handle empty props gracefully', () => {
    const wrapper = mount(TechPill, {
      props: {
        label: 'Test'
      }
    })

    expect(wrapper.text()).toBe('Test')
    expect(wrapper.find('img').exists()).toBe(false)
  })

  it('should apply transition classes to icon', () => {
    const wrapper = mount(TechPill, {
      props: {
        label: 'Vue.js',
        icon: '/icons/vue.svg'
      }
    })

    const img = wrapper.find('img')
    expect(img.classes()).toContain('w-4')
    expect(img.classes()).toContain('h-4')
    expect(img.classes()).toContain('transition-all')
    expect(img.classes()).toContain('duration-200')
  })
})