import {
  MunicipalityDescription,
  MunicipalityId,
  MunicipalityIdDepartment,
  MunicipalityName,
} from "../../value-object";
import { Department } from "../department/department.entity";

export class Municipality {
  constructor(
    readonly id_department: MunicipalityIdDepartment,
    readonly name: MunicipalityName,
    readonly description: MunicipalityDescription,
    readonly id?: MunicipalityId,
    readonly ctl_department?: Department
  ) {}

  public mapToPrimitives() {
    return {
      id: this.id?.value,
      name: this.name.value,
      description: this.description.value,
      clt_department: {
        id: this.ctl_department?.id?.value,
        name: this.ctl_department?.name.value,
        id_country: this.ctl_department?.id_country.value
      },
    };
  }
}
