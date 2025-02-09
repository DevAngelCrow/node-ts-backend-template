import { RolPermissionId, RolPermissionIdPermission, RolPermissionIdRol } from "../../value-object";

export class RolPermission {
    constructor(
        readonly id_permission:  RolPermissionIdPermission,
        readonly id_rol: RolPermissionIdRol,
        readonly id?: RolPermissionId
    ){}
}