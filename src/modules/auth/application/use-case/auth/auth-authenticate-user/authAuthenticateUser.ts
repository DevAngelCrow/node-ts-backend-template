import { CustomError } from "../../../../../../shared/domain/errors/custom.error";
import { AuthServiceRepository, User, UserRepository } from "../../../../domain";

export class AuthenticateUser {
    constructor(private repository: AuthServiceRepository, private repositoryUser: UserRepository){}

    async run(email: string, password: string) : Promise<{user: User; token: string}>{
        const user = await this.repositoryUser.findByEmail(email);

        if(!user || !this.repository.comparePassword(password, user.password.value)){
            throw CustomError.unauthorized("Invalid credentials");
        }

        const token = this.repository.generateToken(user);
        return { user, token};
    }

    
}