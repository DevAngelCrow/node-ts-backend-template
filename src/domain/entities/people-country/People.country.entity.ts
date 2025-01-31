import { PeopleCountryId, PeopleCountryIdCountry, PeopleCountryIdPeople } from "../../value-object";

export class PeopleCountry {
    constructor(
        readonly id_people: PeopleCountryIdPeople,
        readonly id_country: PeopleCountryIdCountry,
        readonly id?: PeopleCountryId
    ){}
}