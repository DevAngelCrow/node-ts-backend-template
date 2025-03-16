const addressUpdateSchema = {
    type: "object",
    properties: {
        id_people: { type: "number"},
        street: { type: "string"},
        street_number: { type: "string"},
        neighborhood: { type: "string"},
        id_district: { type: "number"},
        house_number: { type: "number"},
        block: {type: "string"},
        pathway: {type: "string"},
        description: {type: "string"},
        current: { type: "boolean"},
        active: { type: "boolean"}
    }
}

export default addressUpdateSchema;