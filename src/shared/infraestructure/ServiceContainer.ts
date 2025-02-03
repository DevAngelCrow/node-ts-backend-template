import {
  ExampleCreate,
  ExampleDelete,
  ExampleEdit,
  ExampleGetAll,
  ExampleGetOneById,
  PeopleCreate,
  PeopleDelete,
  PeopleEdit,
  PeopleGetAll,
  PeopleGetOneById,
  CountryCreate,
  CountryDelete,
  CountryEdit,
  CountryGetAll,
  CountryGetOneById
  
} from "../../application/use-case";
import {
  ImplCountryRepository,
  ImplExampleRepository,
  ImplPeopleRepository,
  ImplStorageRepository,
  ImplTransactionManagerRepository,
} from "../../infrastructure/implementation";

const exampleRepository = new ImplExampleRepository();
const peopleRepository = new ImplPeopleRepository();
const countryRepository = new ImplCountryRepository();
const transactionManagerRepository = new ImplTransactionManagerRepository();
const storageRepository = new ImplStorageRepository();

export const ServiceContainer = {
  example: {
    create: new ExampleCreate(exampleRepository),
    update: new ExampleEdit(exampleRepository),
    getOneById: new ExampleGetOneById(exampleRepository),
    getAll: new ExampleGetAll(exampleRepository),
    delete: new ExampleDelete(exampleRepository),
  },
  people: {
    create: new PeopleCreate(peopleRepository, countryRepository, transactionManagerRepository, storageRepository),
    update: new PeopleEdit(peopleRepository),
    getOneById: new PeopleGetOneById(peopleRepository),
    getAll: new PeopleGetAll(peopleRepository),
    delete: new PeopleDelete(peopleRepository),
  },
  country: {
    create: new CountryCreate(countryRepository),
    update: new CountryEdit(countryRepository),
    getOneById: new CountryGetOneById(countryRepository),
    getAll: new CountryGetAll(countryRepository),
    delete: new CountryDelete(countryRepository),
  },
};
