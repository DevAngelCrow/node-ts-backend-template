import {
  DistrictDescription,
  DistrictId,
  DistrictIdMunicipality,
  DistrictName,
  DistrictState,
} from "../../value-object";
import { Municipality } from "../municipality/municipality.entity";

export class District {
  constructor(
    readonly id_municipality: DistrictIdMunicipality,
    readonly name: DistrictName,
    readonly description: DistrictDescription,
    readonly state: DistrictState,
    readonly id?: DistrictId,
    readonly ctl_municipality?: Municipality
  ) {}

  public mapToPrimitives() {
    return {
      id: this.id?.value,
      name: this.name.value,
      description: this.description.value,
      state: this.state.value,
      ctl_municipality: this.mapToPrimitivesMunicipality(),
    };
  }

  public mapToPrimitivesMunicipality() {
    return {
      id: this.ctl_municipality?.id?.value,
      name: this.ctl_municipality?.name.value,
      description: this.ctl_municipality?.description.value,
      id_department: this.ctl_municipality?.id_department.value,
    };
  }
}
