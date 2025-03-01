import { PeopleCountry } from "../../entities";
import { CountryId, PeopleCountryId, PeopleId } from "../../value-object";

export interface PeopleCountryRepository<T = unknown> {
    create(id_people: PeopleId, id_countries: CountryId[], transactionClient?: T): Promise<void>;
    update(id_people: PeopleId, id_countries: CountryId[], transactionClient?: T) : Promise<void>;
    findMany(id_people: PeopleId, transactionClient?: T) : Promise<PeopleCountry[]>
}