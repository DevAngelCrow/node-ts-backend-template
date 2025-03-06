import { User, UserRepository } from "../../../../domain";

export class UserGetAll {
    constructor(private repository: UserRepository){}

    async run() : Promise<User[]>{
        return this.repository.getAll();
    }
}