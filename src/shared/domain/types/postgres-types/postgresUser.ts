export type PostgresUser = {
    id: number,
    id_people: number,
    user_name: string,
    password: string,
    status: { id_status: number, name: string},
    last_access: Date
}