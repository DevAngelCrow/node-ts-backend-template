import {
  StorageRepository,
  TransactionManagerRepository,
  CountryId,
  People,
  PeopleBirthdate,
  PeopleCountryRepository,
  PeopleEmail,
  PeopleFirstName,
  PeopleHasInsurance,
  PeopleId,
  PeopleIdGender,
  PeopleIdMaritalStatus,
  PeopleIdStatus,
  PeopleImgPath,
  PeopleLastName,
  PeopleMiddleName,
  PeoplePhone,
  PeopleRepository,
} from "../../../../../../shared/domain/domain-container/DomainContainer";
import { CustomError } from "../../../../../../shared/domain/errors/custom.error";

export class PeopleEdit<T = unknown> {
  constructor(
    private respository: PeopleRepository,
    private respositoryTransaction: TransactionManagerRepository<T>,
    private respositoryStorage: StorageRepository,
    private repositoryPeopleCountry: PeopleCountryRepository
  ) {}

  async run(
    id: number,
    first_name: string,
    middle_name: string,
    last_name: string,
    birthdate: Date,
    id_gender: number,
    email: string,
    id_marital_status: number,
    img_path: string,
    phone: string,
    has_insurance: boolean,
    id_status: number,
    nationality: number[]
  ): Promise<void> {
    return this.respositoryTransaction
      .runInTransaction(async (tx) => {
        const nationalities = nationality.map((id) => new CountryId(id));
        const people = new People(
          new PeopleFirstName(first_name),
          new PeopleBirthdate(birthdate),
          new PeopleIdGender(id_gender),
          new PeopleEmail(email),
          new PeopleIdMaritalStatus(id_marital_status),
          new PeoplePhone(phone),
          new PeopleIdStatus(id_status),
          nationalities,
          new PeopleMiddleName(middle_name),
          new PeopleLastName(last_name),
          new PeopleImgPath(img_path),
          new PeopleHasInsurance(has_insurance),
          undefined,
          undefined,
          undefined,
          new PeopleId(id)
        );

        const personDb = await this.respository.getOneById(people.getId, tx);

        if (!personDb) {
          throw CustomError.notFound("id people not found");
        }

        await this.repositoryPeopleCountry.update(
          people.getId,
          nationalities,
          tx
        );
        await this.respositoryStorage.delete(
          personDb?.img_path?.value.split("=")[1]!
        );

        return this.respository.update(people, tx);
      })
      .catch(async (error) => {
        throw error;
      });
  }
}
