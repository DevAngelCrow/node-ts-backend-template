export const user = {
    type: "object",
    required: ["id_people", "user_name", "password", "id_status", "last_access"],
    properties: {
        id_people: {
            type: "number"
        },
        user_name: {
            type: "string"
        },
        password: {
            type: "string",
            format: "password"
        },
        id_status: {
            type: "number",
        },
        last_access: {
            type: "string",
            format: "date"
        }
    }
}