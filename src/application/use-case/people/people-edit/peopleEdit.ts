import {
  CountryId,
  People,
  PeopleBirthdate,
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
  TransactionManagerRepository,
} from "../../../../domain";

export class PeopleEdit {
  constructor(
    private respository: PeopleRepository,
    private respositoryTransaction: TransactionManagerRepository
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
    return this.respositoryTransaction.runInTransaction(async () => {
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

      await this.respository.getOneById(people?.id!);
      await this.respository.updatePeopleCountry(people.id, )

      return this.respository.update(people);
    });
  }
}
