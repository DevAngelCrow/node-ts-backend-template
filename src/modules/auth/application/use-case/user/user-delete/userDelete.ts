import { CustomError } from "../../../../../../shared/domain/errors/custom.error";
import { UserId, UserRepository } from "../../../../domain";

export class UserDelete {
    constructor(private repository: UserRepository){}

    async run(id: number) : Promise<void>{
        const user = await this.repository.getById(new UserId(id));
       
        if(!user){
            throw CustomError.notFound("User not found");
        }

        return this.repository.delete(new UserId(user.id?.value!))
    }
}