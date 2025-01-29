import { PermissionDescription, PermissionId, PermissionName } from "../../value-object";

export class Permission {
    constructor(
        readonly name: PermissionName,
        readonly description: PermissionDescription,
        readonly id?: PermissionId
    ){}
}