import { MunicipalityDescription, MunicipalityId, MunicipalityIdDepartment, MunicipalityName } from "../../value-object";
import { Department } from "../department/department.entity";

export class Municipality{
    constructor(
        readonly id_department: MunicipalityIdDepartment,
        readonly name: MunicipalityName,
        readonly description: MunicipalityDescription,
        readonly id?: MunicipalityId,
        readonly ctl_department?: Department
    ){}
}