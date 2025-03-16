const addressGetSchema = {
  type: "object",
  properties: {
    street: { type: "string" },
    street_number: { type: "string" },
    neighborhood: { type: "string" },
    house_number: { type: "number" },
    block: { type: "string" },
    pathway: { type: "string" },
    description: { type: "string" },
    current: { type: "boolean" },
    active: { type: "boolean" },
    location: {
      type: "object",
      properties: {
        district: {
          type: "object",
          properties: {
            id: { type: "number" },
            name: { type: "string" },
          },
        },
        department: {
          type: "object",
          properties: {
            id: { type: "number" },
            name: { type: "string" },
          },
        },
        municipality: {
          type: "object",
          properties: {
            id: { type: "number" },
            name: { type: "string" },
          },
        },
        country: {
          type: "object",
          properties: {
            id: { type: "number" },
            name: { type: "string" },
          },
        },
      },
    },
  },
};

export default addressGetSchema;
