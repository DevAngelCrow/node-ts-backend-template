import { CustomError } from "../../../../../../shared/domain/errors/custom.error";
import { PeopleEmail, PeopleRepository, User, UserRepository } from "../../../../domain";

export class UserFindByEmail {
    constructor(private repository: UserRepository, private respositoryPeople: PeopleRepository){}

    async run(email: string) : Promise<User | null>{
        const emailPeople = await this.respositoryPeople.findByEmail(new PeopleEmail(email));
        if(!emailPeople){
            throw CustomError.notFound("User not found by email")
        }
        return this.repository.findByEmailPeople(emailPeople?.getId!);
    }
}