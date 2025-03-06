const peopleUserSchema = {
  "people user": {
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
      "nationality",
      "user_name",
      "password",
      "id_status_user",
      "last_access",
      "img_path",
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
      nationality: {
        type: "array",
        items: { type: "number" },
      },
      user_name: {
        type: "string",
      },
      password: {
        type: "string",
      },
      id_status_user: {
        type: "number",
      },
      last_access: {
        type: "string",
        format: "date",
      },
      img_path: {
        type: "string",
        format: "binary",
      },
    },
  },
};

export default peopleUserSchema["people user"];
