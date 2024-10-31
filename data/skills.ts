import type { SkillCategory } from '@/types/skill'

export const skills: SkillCategory[] = [
    {
        name: 'Technologies',
        items: [
            {
                name: 'Vue.js',
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg'
            },
            {
                name: 'Pinia',
                icon: 'https://pinia.vuejs.org/logo.svg'
            },
            {
                name: 'Nuxt',
                icon: 'https://nuxt.com/assets/design-kit/icon-green.svg'
            },
            {
                name: 'Symfony',
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/symfony/symfony-original.svg',
                invert: true
            },
            {
                name: 'Docker',
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg'
            },
            {
                name: 'Tailwind',
                icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg'
            }
        ]
    },
    {
        name: 'Soft Skills',
        items: [
            { name: 'Communication' },
            { name: 'Créativité' },
            { name: 'Autonomie' },
            { name: 'Adaptabilité' },
            { name: 'Gestion de projet' },
            { name: "Travail d'équipe" }
        ]
    }
]