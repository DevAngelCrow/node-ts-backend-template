import { MunicipalityDescription, MunicipalityId, MunicipalityIdDepartment, MunicipalityName } from "../../value-object";

export class Municipality{
    constructor(
        readonly id_department: MunicipalityIdDepartment,
        readonly name: MunicipalityName,
        readonly description: MunicipalityDescription,
        readonly id?: MunicipalityId
    ){}
}