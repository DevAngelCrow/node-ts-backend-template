import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";
import { envs } from "../config/envs";
import schemas from "./schemas/index";

const swaggerDefinition: OAS3Definition = {
  openapi: "3.0.0",
  info: {
    title: "API Documentation",
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
        bearerFormat: "JWT"
      },
    },
    schemas: {
      "People": schemas.people,
      "People update": schemas.peopleUpdate,
      "People user": schemas.peopleUserSchema,
      "People get": schemas.peopleGet,
      "Country": schemas.country.country,
      "User": schemas.user,
      "Country update": schemas.country.contryUpdate,
      "Country create" : schemas.country.countryCreate
    },
  },
};

const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: [
    "./src/modules/auth/infrastructure/controllers/auth-service-controller/auth.service.routes.ts",
    "./src/modules/auth/infrastructure/controllers/country-controller/country.routes.ts",
    "./src/modules/auth/infrastructure/controllers/people-controller/people.routes.ts",
    "./src/modules/auth/infrastructure/controllers/user-controller/user.routes.ts",
  ],
};

export default swaggerJSDoc(swaggerOptions);
