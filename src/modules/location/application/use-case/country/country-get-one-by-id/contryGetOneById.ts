import { CustomError } from "../../../../../../shared/domain/errors/custom.error";
import { CountryRepository, Country, CountryId } from "../../../../../auth/domain";

export class CountryGetOneById{
    constructor(private respository: CountryRepository){}

    async run(id: number) : Promise<Country | null>{
        const country = await this.respository.getOneById(new CountryId(id));
        if(!country){
            throw CustomError.notFound("Country not found");
        }
        return country;
    }
}