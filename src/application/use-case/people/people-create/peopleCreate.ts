import {
  CountryId,
  CountryRepository,
  CustomError,
  MultimediaFile,
  People,
  PeopleBirthdate,
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
  StorageRepository,
  TransactionManagerRepository,
} from "../../../../domain";

export class PeopleCreate {
  constructor(
    private repository: PeopleRepository,
    private repositoryCountry: CountryRepository,
    private repositoryTransaction: TransactionManagerRepository,
    private repositoryStorage: StorageRepository
  ) {}

  async run(
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
    id_status: number,
    nationality: number[]
  ): Promise<void> {
    const url_img = await this.repositoryStorage.updload(img_path);
    return this.repositoryTransaction.runInTransaction(async () => {
      const nationalities = nationality.map((id) => new CountryId(id));
      const foundNationalities = await this.repositoryCountry.findMany(
        nationalities
      );
      if (!foundNationalities) {
        throw CustomError.badRequest(
          "The id to the nationality no exist in the records"
        );
      }

      const existingCountriesIds: number[] = foundNationalities.map(
        (country) => country.value
      );

      const nonExistingCountry = nationality.filter(
        (id) => !existingCountriesIds.includes(+id)
      );

      if (nonExistingCountry.length) {
        throw CustomError.badRequest(
          "Los siguientes Id no existen " + nonExistingCountry
        );
      }

      const people = new People(
        new PeopleFirstName(firts_name),
        new PeopleMiddleName(middle_name),
        new PeopleLastName(last_name),
        new PeopleBirthdate(birthdate),
        new PeopleIdGender(+id_gender),
        new PeopleEmail(email),
        new PeopleIdMaritalStatus(+id_marital_status),
        new PeopleImgPath(url_img),
        new PeoplePhone(phone),
        new PeopleHasInsurance(has_insurance),
        new PeopleIdStatus(+id_status),
        nationalities
      );

      return this.repository.create(people);
    });
  }
}
