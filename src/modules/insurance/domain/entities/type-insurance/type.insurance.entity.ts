import { TypeInsuranceDescription, TypeInsuranceId, TypeInsuranceName } from "../../index";

export class TypeInsurance{
    constructor(
        readonly name: TypeInsuranceName,
        readonly description: TypeInsuranceDescription,
        readonly id?: TypeInsuranceId
    ){}
}