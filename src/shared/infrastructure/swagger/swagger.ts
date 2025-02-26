import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";
import { envs } from "../config/envs";

const swaggerDefinition: OAS3Definition = {
  openapi: "3.0.0",
  info: {
    title: "Documentacion de mi API",
    version: "1.0.0",
  },
  servers: [
    {
      url: `http://localhost:${envs.PORT}`,
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
    schemas: {
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
          "img_path"
        ],
        properties: {
            first_name: {
                type: "string"
            },
            middle_name: {
                type: "string"
            },
            last_name: {
                type: "string"
            },
            birthdate: {
                type: "string",
                format: "date"
            },
            id_gender: {
                type: "number"
            },
            email: {
                type: "string"
            },
            id_marital_status: {
                type: "number"
            },
            phone: {
                type: "string"
            },
            has_insurance: {
                type: "boolean"
            },
            id_status: {
                type: "number"
            },
            nationality: {
                type: "array",
                items: {type: "number"}
            },
            user_name: {
                type: "string"
            },
            password: {
                type: "string"
            },
            id_status_user: {
                type: "number"
            },
            last_access: {
                type: "string",
                format: "date"
            },
            img_path: {
                type: "string",
                format: "binary"
            }
        }
      },
    },
  },
};

const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: [
    "./src/modules/auth/infrastructure/controllers/auth-service-controller/auth.service.routes.ts",
    "./src/modules/auth/infrastructure/controllers/country-controller/contry.routes.ts",
    "./src/modules/auth/infrastructure/controllers/people-controller/people.routes.ts",
    "./src/modules/auth/infrastructure/controllers/user-controller/user.routes.ts",
  ],
};

export default swaggerJSDoc(swaggerOptions);
