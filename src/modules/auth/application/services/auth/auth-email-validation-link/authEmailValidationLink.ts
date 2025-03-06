import { AuthServiceRepository } from "../../../../domain";

export class AuthEmailValidationLink{
    constructor(private repository: AuthServiceRepository){}

    async run(email: string) : Promise<void>{
        return await this.repository.sendEmailValidationLink(email);
    }
}