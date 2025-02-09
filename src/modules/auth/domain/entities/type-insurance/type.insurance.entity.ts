import { TypeInsuranceDescription, TypeInsuranceId, TypeInsuranceName } from "../../value-object";

export class TypeInsurance{
    constructor(
        readonly name: TypeInsuranceName,
        readonly description: TypeInsuranceDescription,
        readonly id?: TypeInsuranceId
    ){}
}