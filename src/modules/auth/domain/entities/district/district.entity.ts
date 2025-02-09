import { DistrictDescription, DistrictIdMunicipality, DistrictName, DistrictState } from "../../value-object";

export class District{
    constructor(
        readonly id_municipality: DistrictIdMunicipality,
        readonly name: DistrictName,
        readonly description: DistrictDescription,
        readonly state: DistrictState,
        readonly id?: DistrictIdMunicipality
    ){}
}