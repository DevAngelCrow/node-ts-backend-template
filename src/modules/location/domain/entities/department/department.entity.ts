import { DepartmentDescription, DepartmentId, DepartmentIdCountry, DepartmentName } from "../../value-object";
import { Country } from "../country/coutnry.entity";

export class Department {
    constructor(
        readonly name: DepartmentName,
        readonly description: DepartmentDescription,
        readonly id_country: DepartmentIdCountry,
        readonly id?: DepartmentId,
        readonly ctl_country?: Country
    ){}

    public mapToPrimitives(){
        return {
            id: this.id?.value,
            name: this.name.value,
            description: this.description.value,
            ctl_country: this.mapToPrimitivesCountry()
        }
    }

    private mapToPrimitivesCountry(){
        return {
            id: this.ctl_country?.id?.value,
            name: this.ctl_country?.name.value
        }
    }
}