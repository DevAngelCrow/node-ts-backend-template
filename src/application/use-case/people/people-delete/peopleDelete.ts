import {  PeopleId, PeopleRepository } from "../../../../domain";

export class PeopleDelete{
    constructor(private repository: PeopleRepository){}

    async run(id: number) : Promise<void> {
        
        await this.repository.getOneById(new PeopleId(id));
        
        return this.repository.delete(new PeopleId(id));
    }
}