import { RolDescription, RolId, RolIdStatus, RolName } from "../../value-object";

export class Rol{
    constructor(
        readonly name: RolName,
        readonly description: RolDescription,
        readonly id_status: RolIdStatus,
        readonly id?: RolId
    ){}
}