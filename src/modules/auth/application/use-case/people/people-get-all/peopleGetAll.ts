import { People, PeopleRepository } from "../../../../domain";

export class PeopleGetAll {
    constructor(private respository: PeopleRepository){}

    async run() : Promise<People[]> {
        return this.respository.getAll();
    }
}