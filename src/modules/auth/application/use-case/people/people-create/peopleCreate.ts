import {
  CountryId,
  CountryRepository,
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
} from "../../../../domain";
import { MultimediaFile } from "../../../../../../shared/domain/types";
import {
  StorageRepository,
  TransactionManagerRepository,
} from "../../../../../../shared/domain/domain-container/DomainContainer";
import { CustomError } from "../../../../../../shared/domain/errors/custom.error";

export class PeopleCreate {
  constructor(
    private repository: PeopleRepository,
    private repositoryCountry: CountryRepository,
    private repositoryTransaction: TransactionManagerRepository,
    private repositoryStorage: StorageRepository,
    private repositoryPeopleCountry: PeopleCountryRepository
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
  ): Promise<People> {
    const url_img = await this.repositoryStorage.updload(img_path);
    console.log("aca inicio el peopleCreate");
    const id_img = url_img.split("=")[1];
    //return this.repositoryTransaction
    //.runInTransaction(async () => {

    const nationalities = nationality.map((id) => new CountryId(id));
    const foundNationalities = await this.repositoryCountry.findMany(
      nationalities
    );
    console.log(foundNationalities, "nationalities");
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
        "The following nationality ids do not exist " + nonExistingCountry
      );
    }

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

    return this.repository.create(people);
    // await this.repositoryPeopleCountry.create(
    //   createPerson.getId,
    //   nationalities
    // );

    // console.log(createPerson, 'CREATE PERSON')
    // return createPerson;
    //})
    //.catch(async (error) => {
    //console.log(error, 'error')
    //await this.repositoryStorage.delete(id_img);
    //throw error;
    //});
  }
}
