import { CountryRepository, Country, CountryId } from "../../../../domain";

export class CountryGetOneById{
    constructor(private respository: CountryRepository){}

    async run(id: number) : Promise<Country | null>{
        const country = await this.respository.getOneById(new CountryId(id));

        return country;
    }
}