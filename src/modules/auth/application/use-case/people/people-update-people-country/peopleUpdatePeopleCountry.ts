import { CountryId, PeopleId, PeopleRepository } from "../../../../domain";

export class PeopleUpdatePeopleCountry{
    constructor(private repository: PeopleRepository){}

    async run(id: number, nationalities: number[]) : Promise<void>{
        const nations =  nationalities.map((nationality) => new CountryId(nationality))
        return this.repository.updatePeopleCountry(new PeopleId(id), nations);
    }
}