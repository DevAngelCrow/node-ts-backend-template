import { AuthServiceRepository } from "../../../../domain/repositories/auth-service/AuthServiceRepository";

export class AuthVerifyToken {
    constructor(private repository: AuthServiceRepository){}
    
    run(token: string) : unknown{
        return this.repository.verifyToken(token);
    }
}