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
      "User get": schemas.userGetSchema,
      "Country update": schemas.country.contryUpdate,
      "Country create" : schemas.country.countryCreate,
      "Address create": schemas.address,
      "Address update" : schemas.addressUpdateSchema,
      "Address get": schemas.addressGetSchema,
      "Gender create": schemas.gender,
      "Gender get" : schemas.genderGetSchema,
      "Marital status create": schemas.maritalStatus,
      "Marital status get": schemas.maritalStatusGetSchema,
      "People status create": schemas.peopleStatus,
      "People status get": schemas.peopleStatusGetSchema,
      "District create" : schemas.district,
      "District get" : schemas.districtGetSchema
    },
  },
};

const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: [
    "./src/modules/auth/infrastructure/controllers/auth-service-controller/auth.service.routes.ts",
    "./src/modules/location/infrastructure/controllers/country-controller/country.routes.ts",
    "./src/modules/profile/infrastructure/controllers/people-controller/people.routes.ts",
    "./src/modules/auth/infrastructure/controllers/user-controller/user.routes.ts",
    "./src/modules/profile/infrastructure/controllers/address-controller/address.routes.ts",
    "./src/modules/profile/infrastructure/controllers/gender-controller/gender.routes.ts",
    "./src/modules/profile/infrastructure/controllers/marital-status-controller/maritalStatus.routes.ts",
    "./src/modules/profile/infrastructure/controllers/people-status-controller/peopleStatus.routes.ts",
    "./src/modules/location/infrastructure/controllers/district-controller/district.routes.ts"
  ],
};

export default swaggerJSDoc(swaggerOptions);
