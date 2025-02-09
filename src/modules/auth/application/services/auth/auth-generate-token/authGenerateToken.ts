import { User } from "../../../../domain/index";
import { AuthServiceRepository } from "../../../../domain/index";

export class AuthGenerateToken {
    constructor(private repository: AuthServiceRepository){}

    run(user: User) : string{
        return this.repository.generateToken(user);
    }
}