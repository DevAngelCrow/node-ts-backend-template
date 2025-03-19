import { PeopleStatus, PeopleStatusRepository } from "../../../../domain";

export class PeopleStatusGetAll {
    constructor(private repository: PeopleStatusRepository){}

    async run() : Promise<PeopleStatus[]>{
        return this.repository.getAll();
    }
}