import {
  HttpClientDelete,
  HttpClientGet,
  HttpClientPost,
  HttpClientPut,
} from "../../../modules/http-client/application/services/http-client/index";
import {
  ExampleCreate,
  ExampleDelete,
  ExampleEdit,
  ExampleGetAll,
  ExampleGetOneById,
  UserCreate,
  UserUpdate,
  UserGetById,
  UserGetAll,
  UserDelete,
  UserFindByEmail,
} from "../../../modules/auth/application/use-case/index";
import {
  PeopleCreate,
  PeopleDelete,
  PeopleEdit,
  PeopleGetAll,
  PeopleGetOneById,
  PeopleCreateUser,
  PeopleFindByEmail,
  GenderCreate,
  GenderUpdate,
  GenderGetOneById,
  GenderGetAll,
  GenderDelete,
  MaritalStatusCreate,
  MaritalStatusUpdate,
  MaritalStatusGetOneById,
  MaritalStatusGetAll,
  PeopleStatusCreate,
  PeopleStatusUpdate,
  PeopleStatusGetAll,
  PeopleStatusGetById,
} from "../../../modules/profile/application";
import {
  CountryCreate,
  CountryDelete,
  CountryEdit,
  CountryGetAll,
  CountryGetOneById,
  DepartmentCreate,
  DepartmentDelete,
  DepartmentGet,
  DepartmentGetById,
  DepartmentUpdate,
  DistrictCreate,
  DistrictDelete,
  DistrictGetAll,
  DistrictGetById,
  DistrictUpdate,
} from "../../../modules/location/application/index";
import { envs } from "../config/envs";
import {
  ImplCountryRepository,
  ImplExampleRepository,
} from "../../../modules/auth/infrastructure/implementation/index";

import {
  ImplAddressRepository,
  ImplPeopleCountryRepository,
  ImplPeopleRepository,
  ImplPeopleStatusRepository,
} from "../../../modules/profile/infrastructure/index";

import { ImplHttpClientRepository } from "../../../modules/http-client/infrastructure/implementation/httpClientRepository/impl.HttpClientRepository";
import { ImplStorageRepository } from "../../../modules/storage-handler/infrastructure/implementation/storageRepository/impl.StorageRepository";
import { ImplTransactionManagerRepository } from "../../../modules/transaction-db-manager/infrastructure/implementation/transactionManagerRepository/impl.TransactionManagerRepository";
import { ImplAuthServiceRepository } from "../../../modules/auth/infrastructure/implementation/authServiceRepository/impl.AuthServiceRepository";
import {
  AuthEmailValidationLink,
  AuthGenerateToken,
  AuthVerifyToken,
} from "../../../modules/auth/application/services/auth";
import { AuthenticateUser } from "../../../modules/auth/application/use-case/auth/auth-authenticate-user/authAuthenticateUser";
import { ImplUserRepository } from "../../../modules/auth/infrastructure/implementation/userRepository/impl.UserRepository";
import { AuthPasswordHash } from "../../../modules/auth/application/services/auth/auth-password-hash/authPasswordHash";
import AppDataSource from "../db/TypeOrmConfig";
import {
  DeleteFile,
  UploadFile,
} from "../../../modules/storage-handler/application/services/storage";
import { EntityManager } from "typeorm";
import {
  EmailSend,
  EmailSendWithFile,
} from "../../../modules/email/application/services";
import { ImplEmailService } from "../../../modules/email/infrastructure/implementation/emailRepository/impl.EmailRepository";
import {
  AddressGetOneById,
  AddresGetAll,
  AddressCreate,
  AddressUpdate,
  AddressDelete,
} from "../../../modules/profile/application/use-case/address";
import { AddressChangePlaceResidence } from "../../../modules/profile/application/use-case/address/address-change-place-residence/addressChangePlaceResidence";
import { ImplGenderRepository } from "../../../modules/profile/infrastructure/implementation/genderRepository/impl.GenderRepository";
import { ImplMaritalStatusRepository } from "../../../modules/profile/infrastructure/implementation/maritalStatusRepository/impl.MaritalStatusRepository";
import { ImplDepartmentRepository, ImplDistrictRepository } from "../../../modules/location/infrastructure";
import { ImplMunicipalityRepository } from "../../../modules/location/infrastructure/implementation/municipalityRepository/impl.MunicipalityRepository";
import { MunicipalityCreate, MunicipalityDelete, MunicipalityGetAll, MunicipalityGetById, MunicipalityUpdate } from "../../../modules/location/application/use-case/municipality";

const entityManager = AppDataSource.dataSource.manager;
const optionsEmail = {
  service: envs.MAILER_SERVICE,
  auth: {
    user: envs.MAILER_EMAIL,
    pass: envs.MAILER_SECRET_KEY,
  },
};

const exampleRepository = new ImplExampleRepository();
const peopleRepository = new ImplPeopleRepository(entityManager);
const countryRepository = new ImplCountryRepository(entityManager);
const transactionManagerRepository = new ImplTransactionManagerRepository(
  entityManager
);
const storageRepository = new ImplStorageRepository(envs.STORAGE_WEB_SERVICE);
const peopleStatusRepository = new ImplPeopleStatusRepository(entityManager);
const httpClientRepository = new ImplHttpClientRepository(
  envs.HTTP_CLIENT_ADAPTER
);
const userRepository = new ImplUserRepository(entityManager);
const authServiceRepository = new ImplAuthServiceRepository(
  userRepository,
  peopleRepository
);
const peopleCountryRepository = new ImplPeopleCountryRepository(entityManager);
const emailService = new ImplEmailService(optionsEmail);
const addressRepository = new ImplAddressRepository(entityManager);
const genderRepository = new ImplGenderRepository(entityManager);
const maritalStatusRepository = new ImplMaritalStatusRepository(entityManager);
const districtRepository = new ImplDistrictRepository(entityManager);
const departmentRepository = new ImplDepartmentRepository(entityManager);
const municipalityRepository = new ImplMunicipalityRepository(entityManager);

export const ServiceContainer = {
  example: {
    create: new ExampleCreate(exampleRepository),
    update: new ExampleEdit(exampleRepository),
    getOneById: new ExampleGetOneById(exampleRepository),
    getAll: new ExampleGetAll(exampleRepository),
    delete: new ExampleDelete(exampleRepository),
  },
  people: {
    create: new PeopleCreate(
      peopleRepository,
      countryRepository,
      transactionManagerRepository,
      storageRepository,
      peopleCountryRepository
    ),
    update: new PeopleEdit(
      peopleRepository,
      transactionManagerRepository,
      storageRepository,
      peopleCountryRepository
    ),
    getOneById: new PeopleGetOneById(peopleRepository),
    getAll: new PeopleGetAll(peopleRepository),
    delete: new PeopleDelete(
      peopleRepository,
      peopleStatusRepository,
      transactionManagerRepository,
      peopleCountryRepository
    ),
    findByEmail: new PeopleFindByEmail(peopleRepository),
    createUserWithPerson: new PeopleCreateUser(
      peopleRepository,
      userRepository,
      transactionManagerRepository,
      peopleCountryRepository,
      authServiceRepository,
      emailService
    ),
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
    authenticateUser: new AuthenticateUser(
      authServiceRepository,
      userRepository
    ),
    hashPassword: new AuthPasswordHash(authServiceRepository),
    validateEmail: new AuthEmailValidationLink(authServiceRepository),
  },
  user: {
    create: new UserCreate(userRepository, authServiceRepository),
    update: new UserUpdate(userRepository),
    getOneById: new UserGetById(userRepository),
    getAll: new UserGetAll(userRepository),
    delete: new UserDelete(userRepository),
    getOneByEmail: new UserFindByEmail(userRepository, peopleRepository),
  },
  storage: {
    upload: new UploadFile(storageRepository),
    delete: new DeleteFile(storageRepository),
  },

  emailService: {
    sendEmail: new EmailSend(emailService),
    sendEmailWithFile: new EmailSendWithFile(emailService),
  },
  address: {
    create: new AddressCreate(addressRepository, transactionManagerRepository),
    update: new AddressUpdate(addressRepository, transactionManagerRepository),
    getOneById: new AddressGetOneById(addressRepository),
    getAll: new AddresGetAll(addressRepository),
    delete: new AddressDelete(addressRepository),
    changePlaceResidence: new AddressChangePlaceResidence(addressRepository)
  },
  gender: {
    create: new GenderCreate(genderRepository),
    update: new GenderUpdate(genderRepository),
    getOneById: new GenderGetOneById(genderRepository),
    getAll: new GenderGetAll(genderRepository),
    delete: new GenderDelete(genderRepository),
  },
  maritalStatus: {
    create: new MaritalStatusCreate(maritalStatusRepository),
    update: new MaritalStatusUpdate(maritalStatusRepository),
    getOneById: new MaritalStatusGetOneById(maritalStatusRepository),
    getAll: new MaritalStatusGetAll(maritalStatusRepository)
  },
  peopleStatus: {
    create: new PeopleStatusCreate(peopleStatusRepository),
    update: new PeopleStatusUpdate(peopleStatusRepository),
    getAll: new PeopleStatusGetAll(peopleStatusRepository),
    getOneById: new PeopleStatusGetById(peopleStatusRepository)
  },
  district: {
    create: new DistrictCreate(districtRepository, transactionManagerRepository, municipalityRepository),
    update: new DistrictUpdate(districtRepository, transactionManagerRepository, municipalityRepository),
    getAll: new DistrictGetAll(districtRepository),
    getOneById: new DistrictGetById(districtRepository),
    delete: new DistrictDelete(districtRepository)
  },
  department: {
    create: new DepartmentCreate(departmentRepository, transactionManagerRepository, countryRepository),
    update: new DepartmentUpdate(departmentRepository, transactionManagerRepository, countryRepository),
    getAll: new DepartmentGet(departmentRepository),
    getOneById: new DepartmentGetById(departmentRepository),
    delete: new DepartmentDelete(departmentRepository),
  },
  municipality: {
    create: new MunicipalityCreate(municipalityRepository, transactionManagerRepository, departmentRepository),
    update: new MunicipalityUpdate(municipalityRepository, transactionManagerRepository, departmentRepository),
    getAll: new MunicipalityGetAll(municipalityRepository),
    getOneById: new MunicipalityGetById(municipalityRepository),
    delete: new MunicipalityDelete(municipalityRepository),
  }
};
