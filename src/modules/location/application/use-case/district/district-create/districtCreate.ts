import { CustomError } from "../../../../../../shared/domain/errors/custom.error";
import { TransactionManagerRepository } from "../../../../../transaction-db-manager/domain/repositories/transaction-manager/TransactionManagerRepository";
import {
  District,
  DistrictDescription,
  DistrictIdMunicipality,
  DistrictName,
  DistrictRepository,
  DistrictState,
  MunicipalityId,
  MunicipalityRepository,
} from "../../../../domain";

export class DistrictCreate<T = unknown> {
  constructor(
    private repository: DistrictRepository<T>,
    private repositoryTransaction: TransactionManagerRepository<T>,
    private repositoryMunicipality: MunicipalityRepository<T>
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
      const idMunicipality = await this.repositoryMunicipality.getOneById(new MunicipalityId(id_municipality), tx);
      if(!idMunicipality){
        throw CustomError.notFound("Invalid foreign key. The provided 'id_municipality' does not exist");
      }
      return this.repository.create(district, tx);

    });
  }
}
