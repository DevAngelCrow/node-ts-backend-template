import { UserRolId, UserRolIdRol, UserRolIdUser } from "../../value-object";

export class UserRol{
    constructor(
        readonly id_rol: UserRolIdRol,
        readonly id_user: UserRolIdUser,
        readonly id?: UserRolId
    ){}
}