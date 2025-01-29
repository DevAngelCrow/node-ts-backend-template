import { People, PeopleBirthdate, PeopleEmail, PeopleFirstName, PeopleHasInsurance, PeopleIdGender, PeopleIdMaritalStatus, PeopleIdNationality, PeopleIdStatus, PeopleImgPath, PeopleLastName, PeopleMiddleName, PeoplePhone, PeopleRepository } from "../../../../domain";

export class PeopleCreate {
    constructor(private repository: PeopleRepository){}

    async run(
        firts_name: string,
        middle_name: string,
        last_name: string,
        birthdate: Date,
        id_gender: number,
        email: string,
        id_marital_status: number,
        id_nationality: number,
        img_path: string,
        phone: string,
        has_insurance: boolean,
        id_status: number,
    ) : Promise<void>{

        const people = new People(
            new PeopleFirstName(firts_name),
            new PeopleMiddleName(middle_name),
            new PeopleLastName(last_name),
            new PeopleBirthdate(birthdate),
            new PeopleIdGender(id_gender),
            new PeopleEmail(email),
            new PeopleIdMaritalStatus(id_marital_status),
            new PeopleIdNationality(id_nationality),
            new PeopleImgPath(img_path),
            new PeoplePhone(phone),
            new PeopleHasInsurance(has_insurance),
            new PeopleIdStatus(id_status)
        );

        return this.repository.create(people);
    }
}