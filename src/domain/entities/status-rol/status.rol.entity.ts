import { StatusRolDescription, StatusRolId, StatusRolName } from "../../value-object";

export class StatusRol {
    constructor(
        readonly name: StatusRolName,
        readonly description: StatusRolDescription,
        readonly id?: StatusRolId
    ){}
}