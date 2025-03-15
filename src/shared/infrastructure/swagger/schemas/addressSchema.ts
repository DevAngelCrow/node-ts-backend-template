const address = {
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
        description: {type: "string"}
    }
}

export default address;