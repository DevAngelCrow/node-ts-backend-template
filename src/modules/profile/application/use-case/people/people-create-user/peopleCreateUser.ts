import {
  TransactionManagerRepository,
  AuthServiceRepository,
  CountryId,
  EmailRepository,
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
} from "../../../../../../shared/domain/domain-container/DomainContainer";
import { CustomError } from "../../../../../../shared/domain/errors/custom.error";

export class PeopleCreateUser<T = unknown> {
  constructor(
    private repository: PeopleRepository,
    private repositoryUser: UserRepository,
    private repositoryTransaction: TransactionManagerRepository<T>,
    private repositoryPeopleCountry: PeopleCountryRepository,
    private repositoryAuth: AuthServiceRepository,
    private repositoryEmail: EmailRepository
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
    img_path: string,
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
    const nationalities = nationality.map((id) => new CountryId(id));
    return await this.repositoryTransaction.runInTransaction(async (tx) => {
      const emailPeople = new PeopleEmail(email);
      if (await this.repository.findEmailExist(emailPeople, tx)) {
        throw CustomError.badRequest("The email provided is already in use");
      }
      const people = new People(
        new PeopleFirstName(firts_name),
        new PeopleBirthdate(birthdate),
        new PeopleIdGender(+id_gender),
        emailPeople,
        new PeopleIdMaritalStatus(+id_marital_status),
        new PeoplePhone(phone),
        new PeopleIdStatus(+id_status),
        nationalities,
        new PeopleMiddleName(middle_name),
        new PeopleLastName(last_name),
        new PeopleImgPath(img_path),
        new PeopleHasInsurance(has_insurance)
      );

      const person = await this.repository.create(people, tx);
      if (!person) {
        throw CustomError.internalServer(
          "Internal server error in create UserPeople"
        );
      }

      const user = new User(
        new UserIdPeople(+person.getId.value),
        new UserName(user_name),
        await this.repositoryAuth.hashPassword(new UserPassword(password)),
        new UserIdStatus(id_status_user),
        new UserLastAccess(last_access)
      );

      await this.repositoryUser.create(user, tx);
      await this.repositoryPeopleCountry.create(
        person.getId,
        nationalities,
        tx
      );

      //const authentication = await this.repositoryAuth.authenticateUser(person.email, user.password);

      const emailOptions = await this.repositoryAuth.validateEmail(
        user,
        person.email
      );

      await this.repositoryEmail.sendEmail(emailOptions);
    });
  }
}
