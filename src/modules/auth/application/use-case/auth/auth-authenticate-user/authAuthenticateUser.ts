import { CustomError } from "../../../../../../shared/domain/errors/custom.error";
import { TransactionManagerRepository } from "../../../../../../shared/domain/domain-container/DomainContainer";
import { AuthServiceRepository, PeopleEmail, User, UserLastAccess, UserPassword, UserRepository } from "../../../../domain";

export class AuthenticateUser{
    constructor(private repository: AuthServiceRepository, private repositoryUser: UserRepository){}

    async run(email: string, password: string) : Promise<{user: User; token: string}>{
        const authenticateProcess = await this.repository.authenticateUser(new PeopleEmail(email), new UserPassword(password));
    
        if(!authenticateProcess){
            throw CustomError.unauthorized("Invalid credentials");
        }
        if(!authenticateProcess.user.id?.value){
            throw CustomError.unauthorized("Invalid credentials");
        }
        await this.repositoryUser.updateDateAccess(authenticateProcess.user.id, authenticateProcess.user.last_access);

        return authenticateProcess;
        
    }

    
}