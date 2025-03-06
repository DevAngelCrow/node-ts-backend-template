import { Country, CountryAbbreviation, CountryCode, CountryName, CountryRepository, CountryState } from "../../../../../../shared/domain/domain-container/DomainContainer";

export class CountryCreate {
    constructor(private repository: CountryRepository){}

    async run(
        name: string,
        abbreviation: string,
        code: string,
        state: boolean
    ) : Promise<void>{
        const country = new Country(
            new CountryName(name),
            new CountryAbbreviation(abbreviation),
            new CountryCode(code),
            new CountryState(state),
        )

        return this.repository.create(country);
    }
}