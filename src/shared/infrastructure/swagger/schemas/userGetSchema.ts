export const userGetSchema = {
    type: "object",
    properties: {
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
        },
        people: {
            
        }
    }
}