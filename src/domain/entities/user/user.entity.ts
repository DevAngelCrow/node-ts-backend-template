import { UserId, UserIdPeople, UserIdStatus, UserLastAccess, UserName, UserPassword } from "../../value-object";

export class User{
    constructor(
        readonly id_people: UserIdPeople,
        readonly user_name: UserName,
        readonly password: UserPassword,
        readonly id_status: UserIdStatus,
        readonly last_access: UserLastAccess,
        readonly id?: UserId 
    ){}
}