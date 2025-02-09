import { People, PeopleEmail, PeopleRepository } from "../../../../domain";

export class PeopleFindByEmail { 
    constructor(private repository: PeopleRepository){}

    async run(email: string) : Promise<People | null> {
        return this.repository.findByEmail(new PeopleEmail(email));
    }
}