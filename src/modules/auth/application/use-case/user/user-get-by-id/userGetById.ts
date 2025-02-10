import { CustomError } from "../../../../../../shared/domain/errors/custom.error";
import { User, UserId, UserRepository } from "../../../../domain";

export class UserGetById {
    constructor(private repository: UserRepository){}

    run(id: number) : Promise<User | null> {
        const user = this.repository.getById(new UserId(id));
        
        if(!user){
            throw CustomError.notFound("User not found");
        }
        
        return user;
    }
}