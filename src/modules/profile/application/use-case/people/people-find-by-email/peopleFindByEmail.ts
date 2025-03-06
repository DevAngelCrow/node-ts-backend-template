import { CustomError } from "../../../../../../shared/domain/errors/custom.error";
import { People, PeopleEmail, PeopleRepository } from "../../../../../../shared/domain/domain-container/DomainContainer";

export class PeopleFindByEmail { 
    constructor(private repository: PeopleRepository){}

    async run(email: string) : Promise<People | null> {
        const person = await this.repository.findByEmail(new PeopleEmail(email));
        if(!person){
            throw CustomError.notFound("People not found by email");
        }
        return person;
    }
}