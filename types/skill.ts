export interface SkillCategory {
    name: string;
    items: SkillItem[];
}

export interface SkillItem {
    name: string;
    icon?: string;
    invert?: boolean;
}