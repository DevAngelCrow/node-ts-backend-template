import { CountryId, CountryRepository } from "../../../../domain";
import { TransactionManagerRepository } from "../../../../../../shared/domain/domain-container/DomainContainer";

export class CountryFindMany {
    constructor(private respository: CountryRepository){}

    async run(countries: number[]) : Promise<CountryId[] | null> {
        const countriesIds = countries.map((id) => new CountryId(id));
        //return this.repositoryTransaction.runInTransaction(async () => {
            return this.respository.findMany(countriesIds);
        //})
        
    }
}