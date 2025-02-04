import {
  CountryId,
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
} from "../../value-object/index";
import { Country, Gender, MaritalStatus, PeopleStatus } from "../index";

export class People {
  constructor(
    readonly first_name: PeopleFirstName,
    readonly birthdate: PeopleBirthdate,
    readonly id_gender: PeopleIdGender,
    readonly email: PeopleEmail,
    readonly id_marital_status: PeopleIdMaritalStatus,
    readonly phone: PeoplePhone,
    readonly id_status: PeopleIdStatus,
    readonly nationality: CountryId[] | Country[],
    readonly middle_name?: PeopleMiddleName,
    readonly last_name?: PeopleLastName,
    readonly img_path?: PeopleImgPath,
    readonly has_insurance?: PeopleHasInsurance,
    readonly ctl_gender?: Gender,
    readonly ctl_marital_status?: MaritalStatus,
    readonly ctl_status_people?: PeopleStatus,
    readonly id?: PeopleId
  ) {}

  public mapToPrimitives() {
    this.mapToPrimitivesCountry();
    return {
      id: this.id?.value,
      first_name: this.first_name.value,
      middle_name: this.middle_name?.value,
      last_name: this.last_name?.value,
      birthdate: this.birthdate.value,
      email: this.email.value,
      phone: this.phone.value,
      nationalities: this.mapToPrimitivesCountry(),
      img_path: this.img_path?.value,
      ctl_status_people: this.mapToPrimitivesStatusPeople(),
      ctl_marital_status: this.mapToPrimitivesMaritalStatus(),
      ctl_gender: this.mapToPrimitivesGender(),
    };
  }

  public mapToPrimitivesStatusPeople() {
    return {
      id: this.ctl_status_people?.id?.value,
      name: this.ctl_status_people?.name.value,
      description: this.ctl_status_people?.description.value,
    };
  }
  public mapToPrimitivesMaritalStatus() {
    return {
      id: this.ctl_marital_status?.id?.value,
      name: this.ctl_marital_status?.name.value,
    };
  }
  public mapToPrimitivesGender() {
    return {
      id: this.ctl_gender?.id?.value,
      name: this.ctl_gender?.name.value,
    };
  }

  public mapToPrimitivesCountry() {
    const nationalities = this.nationality.map((item) => {
      if (item instanceof Country) {
        return item.mapToPrimitives();
      }
    });
    return nationalities;
  }
}
