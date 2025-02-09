import { Country, CountryRepository } from "../../../../domain";

export class CountryGetAll {
    constructor(private respository: CountryRepository){}

    async run() : Promise<Country[]> {
        return this.respository.getAll();
    }
}