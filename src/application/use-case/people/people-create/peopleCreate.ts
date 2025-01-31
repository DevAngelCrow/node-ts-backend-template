import { CountryId, People, PeopleBirthdate, PeopleEmail, PeopleFirstName, PeopleHasInsurance, PeopleIdGender, PeopleIdMaritalStatus, PeopleIdStatus, PeopleImgPath, PeopleLastName, PeopleMiddleName, PeoplePhone, PeopleRepository } from "../../../../domain";

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
        img_path: string,
        phone: string,
        has_insurance: boolean,
        id_status: number,
        nationality: number[]
    ) : Promise<void>{
        const nationalities = nationality.map((id)=> new CountryId(id));
        const people = new People(
            new PeopleFirstName(firts_name),
            new PeopleMiddleName(middle_name),
            new PeopleLastName(last_name),
            new PeopleBirthdate(birthdate),
            new PeopleIdGender(id_gender),
            new PeopleEmail(email),
            new PeopleIdMaritalStatus(id_marital_status),
            new PeopleImgPath(img_path),
            new PeoplePhone(phone),
            new PeopleHasInsurance(has_insurance),
            new PeopleIdStatus(id_status),
            nationalities
        );

        return this.repository.create(people);
    }
}