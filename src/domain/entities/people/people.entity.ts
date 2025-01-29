import {
  PeopleBirthdate,
  PeopleEmail,
  PeopleFirstName,
  PeopleHasInsurance,
  PeopleId,
  PeopleIdGender,
  PeopleIdMaritalStatus,
  PeopleIdNationality,
  PeopleIdStatus,
  PeopleImgPath,
  PeopleLastName,
  PeopleMiddleName,
  PeoplePhone,
} from "../../value-object/index";

export class People {
  constructor(
    readonly first_name: PeopleFirstName,
    readonly middle_name: PeopleMiddleName,
    readonly last_name: PeopleLastName,
    readonly birthdate: PeopleBirthdate,
    readonly id_gender: PeopleIdGender,
    readonly email: PeopleEmail,
    readonly id_marital_status: PeopleIdMaritalStatus,
    readonly id_nationality: PeopleIdNationality,
    readonly img_path: PeopleImgPath,
    readonly phone: PeoplePhone,
    readonly has_insurance: PeopleHasInsurance,
    readonly id_status: PeopleIdStatus,
    readonly id?: PeopleId
  ) {}
}
