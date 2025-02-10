import { CustomError } from "../../../../../../shared/domain/errors/custom.error";
import { AuthServiceRepository, PeopleEmail, User, UserPassword } from "../../../../domain";

export class AuthenticateUser {
    constructor(private repository: AuthServiceRepository){}

    async run(email: string, password: string) : Promise<{user: User; token: string}>{
        
        return await this.repository.AuthenticateUser(new PeopleEmail(email), new UserPassword(password));
        
    }

    
}