import { HttpClientDelete, HttpClientGet, HttpClientPost, HttpClientPut } from "../../../modules/http-client/application/services/http-client/index";
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
  CountryGetOneById,
  PeopleFindByEmail

} from "../../../modules/auth/application/use-case/index";
import { envs } from "../config/envs";
import {
  ImplCountryRepository,
  ImplExampleRepository,
  ImplPeopleRepository,
  ImplPeopleStatusRepository,
} from "../../../modules/auth/infrastructure/implementation/index";

import { ImplHttpClientRepository } from "../../../modules/http-client/infrastructure/implementation/httpClientRepository/impl.HttpClientRepository";
import { ImplStorageRepository } from "../../../modules/storage-handler/infrastructure/implementation/storageRepository/impl.StorageRepository";
import { ImplTransactionManagerRepository } from "../../../modules/transaction-db-manager/infrastructure/implementation/transactionManagerRepository/impl.TransactionManagerRepository";
import { ImplAuthServiceRepository } from "../../../modules/auth/infrastructure/implementation/authServiceRepository/impl.AuthServiceRepository";
import { AuthGenerateToken, AuthVerifyToken } from "../../../modules/auth/application/services/auth";
import { AuthenticateUser } from "../../../modules/auth/application/use-case/auth/auth-authenticate-user/authAuthenticateUser";
import { ImplUserRepository } from "../../../modules/auth/infrastructure/implementation/userRepository/impl.UserRepository";

const exampleRepository = new ImplExampleRepository();
const peopleRepository = new ImplPeopleRepository();
const countryRepository = new ImplCountryRepository();
const transactionManagerRepository = new ImplTransactionManagerRepository();
const storageRepository = new ImplStorageRepository();
const peopleStatusRepository = new ImplPeopleStatusRepository();
const httpClientRepository = new ImplHttpClientRepository(envs.HTTP_CLIENT_ADAPTER);
const authServiceRepository = new ImplAuthServiceRepository();
const userRepository = new ImplUserRepository()

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
    findByEmail: new PeopleFindByEmail(peopleRepository),
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
  },
  authService: {
    generateToken: new AuthGenerateToken(authServiceRepository),
    verifyToken: new AuthVerifyToken(authServiceRepository),
    authenticateUser: new AuthenticateUser(authServiceRepository, userRepository, peopleRepository),
  }
};
