import { Insurance } from "../../entities";

export interface InsuranceRepository {
    create(insurance: Insurance) : Promise<void>;
}