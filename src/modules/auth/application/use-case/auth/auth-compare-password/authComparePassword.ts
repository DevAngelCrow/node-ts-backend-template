import { AuthServiceRepository } from "../../../../domain";

export class ComparePassword {
    constructor(private repository: AuthServiceRepository){}

    run(plain: string, hashed: string) : boolean{
        return this.repository.comparePassword(plain, hashed);
    }
}