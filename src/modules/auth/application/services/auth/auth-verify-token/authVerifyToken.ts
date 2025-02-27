import { AuthServiceRepository } from "../../../../domain/repositories/auth-service/AuthServiceRepository";

export class AuthVerifyToken<T>{
    constructor(private repository: AuthServiceRepository){}
    
    async run<T>(token: string) : Promise<T | null> {
        return this.repository.verifyToken<T>(token);
    }
}