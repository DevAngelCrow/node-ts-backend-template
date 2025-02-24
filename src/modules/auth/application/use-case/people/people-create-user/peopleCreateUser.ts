import {
  StorageRepository,
  TransactionManagerRepository,
} from "../../../../../../shared/domain/domain-container/DomainContainer";
import { CustomError } from "../../../../../../shared/domain/errors/custom.error";
import { MultimediaFile } from "../../../../../../shared/domain/types";
import {
  CountryId,
  People,
  PeopleBirthdate,
  PeopleCountryRepository,
  PeopleEmail,
  PeopleFirstName,
  PeopleHasInsurance,
  PeopleIdGender,
  PeopleIdMaritalStatus,
  PeopleIdStatus,
  PeopleImgPath,
  PeopleLastName,
  PeopleMiddleName,
  PeoplePhone,
  PeopleRepository,
  User,
  UserIdPeople,
  UserIdStatus,
  UserLastAccess,
  UserName,
  UserPassword,
  UserRepository,
} from "../../../../domain";

export class PeopleCreateUser {
  constructor(
    private repository: PeopleRepository,
    private repositoryUser: UserRepository,
    private repositoryTransaction: TransactionManagerRepository,
    private repositoryStorage: StorageRepository,
    private repositoryPeopleCountry: PeopleCountryRepository
  ) {}

  async run(
    //people
    firts_name: string,
    middle_name: string,
    last_name: string,
    birthdate: Date,
    id_gender: number,
    email: string,
    id_marital_status: number,
    img_path: MultimediaFile,
    phone: string,
    has_insurance: boolean,
    id_status_user: number,
    nationality: number[],
    //user

    user_name: string,
    password: string,
    id_status: number,
    last_access: Date
  ): Promise<void> {
    const url_img = await this.repositoryStorage.updload(img_path);

    const nationalities = nationality.map((id) => new CountryId(id));
    return await this.repositoryTransaction.runInTransaction(async () => {
      const people = new People(
        new PeopleFirstName(firts_name),
        new PeopleBirthdate(birthdate),
        new PeopleIdGender(+id_gender),
        new PeopleEmail(email),
        new PeopleIdMaritalStatus(+id_marital_status),
        new PeoplePhone(phone),
        new PeopleIdStatus(+id_status),
        nationalities,
        new PeopleMiddleName(middle_name),
        new PeopleLastName(last_name),
        new PeopleImgPath(url_img),
        new PeopleHasInsurance(has_insurance)
      );
      
      const person = await this.repository.create(people)
      //console.log(persona, 'esto trae')
      if (!person) {
        throw CustomError.internalServer(
          "Internal server error in create UserPeople"
        );
      }

      await this.repositoryPeopleCountry.create(person.getId, nationalities);

      const user = new User(
        new UserIdPeople(+person.getId.value),
        new UserName(user_name),
        new UserPassword(password),
        new UserIdStatus(id_status_user),
        new UserLastAccess(last_access)
      );

      await this.repositoryUser.create(user);

     await this.repository.createUserWithPerson(people, user);
    })
  }
}
