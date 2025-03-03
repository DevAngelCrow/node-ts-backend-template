import {  CountryId, CountryRepository } from "../../../../../auth/domain";

export class CountryDelete{
    constructor(private repository: CountryRepository){}

    async run(id: number) : Promise<void> {
        
        await this.repository.getOneById(new CountryId(id));

        return this.repository.delete(new CountryId(id));
    }
}