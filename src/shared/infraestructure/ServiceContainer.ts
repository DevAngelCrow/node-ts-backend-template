import { HttpClientDelete, HttpClientGet, HttpClientPost, HttpClientPut } from "../../application/services";
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
import { envs } from "../../infrastructure/config/envs";
import {
  ImplCountryRepository,
  ImplExampleRepository,
  ImplHttpClientRepository,
  ImplPeopleRepository,
  ImplPeopleStatusRepository,
  ImplStorageRepository,
  ImplTransactionManagerRepository,
} from "../../infrastructure/implementation";

const exampleRepository = new ImplExampleRepository();
const peopleRepository = new ImplPeopleRepository();
const countryRepository = new ImplCountryRepository();
const transactionManagerRepository = new ImplTransactionManagerRepository();
const storageRepository = new ImplStorageRepository();
const peopleStatusRepository = new ImplPeopleStatusRepository();
const httpClientRepository = new ImplHttpClientRepository(envs.HTTP_CLIENT_ADAPTER);

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
    update: new PeopleEdit(peopleRepository, transactionManagerRepository, storageRepository),
    getOneById: new PeopleGetOneById(peopleRepository),
    getAll: new PeopleGetAll(peopleRepository),
    delete: new PeopleDelete(peopleRepository, peopleStatusRepository),
  },
  country: {
    create: new CountryCreate(countryRepository),
    update: new CountryEdit(countryRepository),
    getOneById: new CountryGetOneById(countryRepository),
    getAll: new CountryGetAll(countryRepository),
    delete: new CountryDelete(countryRepository),
  },
  httpClient: {
    get: new HttpClientGet(httpClientRepository),
    post: new HttpClientPost(httpClientRepository),
    put: new HttpClientPut(httpClientRepository),
    delete: new HttpClientDelete(httpClientRepository),
  }
};
