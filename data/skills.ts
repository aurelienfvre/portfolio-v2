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
                icon: `data:image/svg+xml,${encodeURIComponent(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C8.8 4 6.8 5.66667 6 9C7.2 7.33333 8.6 6.70833 10.2 7.125C11.1129 7.3625 11.7653 8.05278 12.4876 8.8162C13.664 10.0602 15.0258 11.5 18 11.5C21.2 11.5 23.2 9.83333 24 6.5C22.8 8.16667 21.4 8.79167 19.8 8.375C18.8871 8.1375 18.2347 7.44722 17.5124 6.6838C16.336 5.43981 14.9742 4 12 4ZM6 11.5C2.8 11.5 0.8 13.1667 0 16.5C1.2 14.8333 2.6 14.2083 4.2 14.625C5.11289 14.863 5.76533 15.5528 6.48756 16.3162C7.664 17.5602 9.02578 19 12 19C15.2 19 17.2 17.3333 18 14C16.8 15.6667 15.4 16.2917 13.8 15.875C12.8871 15.6375 12.2347 14.9472 11.5124 14.1838C10.336 12.9398 8.97422 11.5 6 11.5Z" fill="#38BDF8"/></svg>`)}`
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