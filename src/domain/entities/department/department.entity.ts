import { DepartmentDescription, DepartmentId, DepartmentIdCountry, DepartmentName } from "../../value-object";

export class Department {
    constructor(
        readonly name: DepartmentName,
        readonly description: DepartmentDescription,
        readonly id_country: DepartmentIdCountry,
        readonly id?: DepartmentId
    ){}
}