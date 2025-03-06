import { People, PeopleRepository } from "../../../../../../shared/domain/domain-container/DomainContainer";

export class PeopleGetAll {
    constructor(private respository: PeopleRepository){}

    async run() : Promise<People[]> {
        return this.respository.getAll();
    }
}