import { StatusUserName, UserId, UserIdPeople, UserIdStatus, UserLastAccess, UserName, UserPassword } from "../../value-object";

export class User{
    constructor(
        readonly id_people: UserIdPeople,
        readonly user_name: UserName,
        readonly password: UserPassword,
        readonly id_status: UserIdStatus,
        readonly last_access: UserLastAccess,
        readonly id?: UserId,
        readonly status?: StatusUserName
    ){}

    public mapToPrimitivesLogin(){
        return {
            user_name: this.user_name.value,
            last_access: this.last_access.value,
            status: this.status?.value,
        }
    }
}