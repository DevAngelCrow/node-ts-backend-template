import { PeopleCountryId, PeopleCountryIdCountry, PeopleCountryIdPeople, PeopleCountryStatus } from "../../value-object";

export class PeopleCountry {
    constructor(
        readonly id_people: PeopleCountryIdPeople,
        readonly id_country: PeopleCountryIdCountry,
        readonly state: PeopleCountryStatus,
        readonly id?: PeopleCountryId
    ){}
}