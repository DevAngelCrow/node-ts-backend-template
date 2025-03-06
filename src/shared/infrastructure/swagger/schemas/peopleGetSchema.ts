const peopleGetSchema = {
  people: {
    type: "object",
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
      email: {
        type: "string",
      },
      phone: {
        type: "string",
      },
      has_insurance: {
        type: "boolean",
      },
      nationality: {
        type: "array",
        items: { type: "number" },
      },
      img_path: {
        type: "string",
        format: "binary",
      },
      ctl_status_people: {
        type: "object",
        properties: {
          id: {
            type: "number",
          },
          name: {
            type: "string",
          },
          description: {
            type: "string",
          },
        },
      },
      ctl_marital_status: {
        type: "object",
        properties: {
          id: {
            type: "number",
          },
          name: {
            type: "string",
          },
        },
      },
      ctl_gender: {
        type: "object",
        properties: {
          id: {
            type: "number",
          },
          name: {
            type: "string",
          },
        },
      },
    },
  },
};

export default peopleGetSchema.people;
