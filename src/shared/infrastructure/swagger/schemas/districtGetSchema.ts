export const districtGetSchema = {
    type: "object",
    properties: {
        id: {type: "number"},
        id_municipality: { type: "number"},
        name: { type: "string"},
        description: {type: "string"},
        state: {type: "boolean"}
    }
}