import { PeopleCountry } from "../../entities";
import { CountryId, PeopleCountryId, PeopleId } from "../../value-object";

export interface PeopleCountryRepository {
    create(id_people: PeopleId, id_countries: CountryId[]): Promise<void>;
    update(id_people: PeopleId, id_countries: CountryId[]) : Promise<void>;
    findMany(id_people: PeopleId) : Promise<PeopleCountry[]>
}