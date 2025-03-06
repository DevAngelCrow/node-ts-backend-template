import { Country, CountryRepository } from "../../../../../../shared/domain/domain-container/DomainContainer";

export class CountryGetAll {
    constructor(private respository: CountryRepository){}

    async run() : Promise<Country[]> {
        return this.respository.getAll();
    }
}