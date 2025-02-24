import {
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
} from "../../../../domain";
import { MultimediaFile } from "../../../../../../shared/domain/types";
import { StorageRepository, TransactionManagerRepository } from "../../../../../../shared/domain/domain-container/DomainContainer"
import { CustomError } from "../../../../../../shared/domain/errors/custom.error";

export class PeopleEdit {
  constructor(
    private respository: PeopleRepository,
    private respositoryTransaction: TransactionManagerRepository,
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
    img_path: MultimediaFile,
    phone: string,
    has_insurance: boolean,
    id_status: number,
    nationality: number[]
  ): Promise<void> {
    let img_path_edit : string = "";
    if(img_path){
      img_path_edit = await this.respositoryStorage.updload(img_path);
    }
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
        new PeopleImgPath(img_path_edit),
        new PeopleHasInsurance(has_insurance),
        undefined,
        undefined,
        undefined,
        new PeopleId(id)
      );

      const personDb = await this.respository.getOneById(people.getId);

      if(!personDb){
        throw CustomError.notFound("id people not found")
      }

      await this.repositoryPeopleCountry.update(people.getId, nationalities);
      await this.respositoryStorage.delete(personDb?.img_path?.value.split("=")[1]!);

      return this.respository.update(people);
    }).catch(async (error)=>{
      await this.respositoryStorage.delete(img_path_edit.split("=")[1]!);
      throw error;
    })
  }
}
