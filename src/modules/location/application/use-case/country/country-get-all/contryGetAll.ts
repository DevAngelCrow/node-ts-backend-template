import { Country, CountryRepository } from "../../../../../auth/domain";

export class CountryGetAll {
    constructor(private respository: CountryRepository){}

    async run() : Promise<Country[]> {
        return this.respository.getAll();
    }
}