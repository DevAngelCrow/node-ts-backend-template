export type PostgresCountry = {
    id: number;
    name: string;
    abbreviation: string | null;
    code: string | null;
    state: boolean | null;
}