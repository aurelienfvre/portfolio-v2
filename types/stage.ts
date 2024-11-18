export interface Location {
    name: string;
    isPrimary?: boolean;
}

export interface StageInfo {
    duration: string;
    startDate: string;
    position: string;
    locations: Location[];
}