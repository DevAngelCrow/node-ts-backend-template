const peopleUpdateSchema = {
  people: {
    type: "object",
    required: [
      "first_name",
      "middle_name",
      "last_name",
      "birthdate",
      "id_gender",
      "email",
      "id_marital_status",
      "phone",
      "has_insurance",
      "id_status",
      "img_path",
      "nationality",
    ],
    properties: {
      first_name: {
        type: "string",
      },
      middle_name: {
        type: "string",
      },
      last_name: {
        type: "string",
      },
      birthdate: {
        type: "string",
        format: "date",
      },
      id_gender: {
        type: "number",
      },
      email: {
        type: "string",
      },
      id_marital_status: {
        type: "number",
      },
      phone: {
        type: "string",
      },
      has_insurance: {
        type: "boolean",
      },
      id_status: {
        type: "number",
      },
      img_path: {
        type: "string",
        format: "binary",
      },
      nationality: {
        type: "array",
        items: { type: "number" },
      },
    },
  },
};

export default peopleUpdateSchema.people;
