import { CountryId, CountryRepository, PeopleCountryRepository, PeopleId } from "../../../../domain";

export class PeopleCountryCreate {
    constructor(private repository: PeopleCountryRepository, private repositoryCountry: CountryRepository){}

    async run(id_people: number, id_countries: number[]){
        const countryId = id_countries.map((idCountry) => new CountryId(idCountry));

        const country = await this.repositoryCountry.findMany(countryId);

        return this.repository.create(new PeopleId(id_people), countryId);
    }
}