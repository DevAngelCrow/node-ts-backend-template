import { CountryId, CountryRepository, TransactionManagerRepository } from "../../../../domain";

export class CountryGetAll {
    constructor(private respository: CountryRepository, private repositoryTransaction: TransactionManagerRepository){}

    async run(countries: number[]) : Promise<CountryId[] | null> {
        const countriesIds = countries.map((id) => new CountryId(id));
        return this.repositoryTransaction.runInTransaction(async () => {
            return this.respository.findMany(countriesIds);
        })
        
    }
}