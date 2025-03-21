export type PostgresMunicipality = {
    id: number;
    id_department: number;
    name: string;
    description?: string | null;
    ctl_department: {
        id: number;
        name: string;
        description?: string | null;
        id_country: number
    }
}