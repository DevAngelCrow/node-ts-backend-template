import { AuthServiceRepository, UserPassword } from "../../../../domain";

export class AuthPasswordHash {
    constructor(private repository: AuthServiceRepository){}

    async run(password: string) : Promise<UserPassword>{
        return this.repository.hashPassword(new UserPassword(password));
    }
}