import { TypeInsurance } from "../../entities";

export interface TypeInsuranceRepository {
    create(typeInsurance: TypeInsurance) : Promise<void>;
}