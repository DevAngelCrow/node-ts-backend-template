const country = {
  type: "object",
  properties: {
    id: { type: "number" },
    name: { type: "string" },
    abbreviation: { type: "string" },
    code: { type: "string" },
    state: { type: "boolean" },
  },
};

const contryUpdate = {
  type: "object",
  properties: {
    name: { type: "string" },
    abbreviation: { type: "string" },
    code: { type: "string" },
    state: { type: "boolean" },
  },
};

const countryCreate = {
  type: "object",
  properties: {
    name: { type: "string" },
    abbreviation: { type: "string" },
    code: { type: "string" },
    state: { type: "boolean" },
  },
};

export default {
  country,
  contryUpdate,
  countryCreate
};
