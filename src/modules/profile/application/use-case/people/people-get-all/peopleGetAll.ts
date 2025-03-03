import { People, PeopleRepository } from "../../../../../auth/domain";

export class PeopleGetAll {
    constructor(private respository: PeopleRepository){}

    async run() : Promise<People[]> {
        return this.respository.getAll();
    }
}