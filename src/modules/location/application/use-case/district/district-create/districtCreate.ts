import { TransactionManagerRepository } from "../../../../../transaction-db-manager/domain/repositories/transaction-manager/TransactionManagerRepository";
import {
  District,
  DistrictDescription,
  DistrictIdMunicipality,
  DistrictName,
  DistrictRepository,
  DistrictState,
} from "../../../../domain";

export class DistrictCreate<T = unknown> {
  constructor(
    private repository: DistrictRepository<T>,
    private repositoryTransaction: TransactionManagerRepository<T>,
  ) {}

  async run(
    id_municipality: number,
    name: string,
    description: string,
    state: boolean = true
  ): Promise<void> {
    const district = new District(
      new DistrictIdMunicipality(id_municipality),
      new DistrictName(name),
      new DistrictDescription(description),
      new DistrictState(state)
    );
    return await this.repositoryTransaction.runInTransaction(async (tx) => {

      return this.repository.create(district, tx);

    });
  }
}
