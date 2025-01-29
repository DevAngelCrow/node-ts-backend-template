import { InsuranceDescription, InsuranceId, InsuranceIdPeople, InsuranceIdTypeMedicalInsurance, InsuranceName } from "../../value-object";

export class Insurance {
    constructor(
        readonly name: InsuranceName,
        readonly description: InsuranceDescription,
        readonly id_people: InsuranceIdPeople,
        readonly id_type_medical_insurance: InsuranceIdTypeMedicalInsurance,
        readonly id?: InsuranceId
    ){}
}