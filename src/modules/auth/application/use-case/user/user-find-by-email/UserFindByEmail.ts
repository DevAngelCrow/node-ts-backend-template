import { PeopleEmail, PeopleRepository, User, UserRepository } from "../../../../domain";

export class UserFindByEmail {
    constructor(private repository: UserRepository, private respositoryPeople: PeopleRepository){}

    async run(email: string) : Promise<User | null>{
        const emailPeople = await this.respositoryPeople.findByEmail(new PeopleEmail(email))
        return this.repository.findByEmailPeople(emailPeople?.id!);
    }
}