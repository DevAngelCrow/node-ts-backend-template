import { CustomError } from "../../../../../../shared/domain/errors/custom.error";
import { PeopleEmail, PeopleRepository } from "../../../../domain";

export class PeopleEmailExists{
    constructor(private repository: PeopleRepository){}

    async run (email: string) : Promise<boolean> {
        const peopleEmail = await this.repository.findEmailExist(new PeopleEmail(email));
        
        if(peopleEmail){
            throw CustomError.badRequest("The email provided is already in use")
        }

        return peopleEmail;
    }
}