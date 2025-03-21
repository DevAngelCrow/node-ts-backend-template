export type PostgresDepartment = {
    id: number;
    name: string;
    description?: string | null;
    id_country: number;
    ctl_country: {
        id: number;
        name: string;
        abbreviation: string;
        code: string;
        state: boolean
    }
}