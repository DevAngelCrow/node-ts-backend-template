import { User, UserIdPeople, UserIdStatus, UserLastAccess, UserName, UserPassword, UserRepository } from "../../../../domain";

export class UserCreate {
    constructor(private respository: UserRepository){}

    run(
        id_people: number,
        user_name: string,
        password: string,
        id_status: number,
        last_access: Date,
    ) : Promise<void>{

        const user = new User(
            new UserIdPeople(+id_people),
            new UserName(user_name),
            new UserPassword(password),
            new UserIdStatus(id_status),
            new UserLastAccess(last_access)
        );

        return this.respository.create(user);
    }
}