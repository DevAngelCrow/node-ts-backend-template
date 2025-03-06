import { UserId, UserLastAccess, UserRepository } from "../../../../domain";

export class UserUpdateDateAccess {
    constructor(private repository: UserRepository){}

    async run(id: number, last_access: Date) : Promise<void> {
       return this.repository.updateDateAccess(new UserId(id), new UserLastAccess(last_access));
    }
}