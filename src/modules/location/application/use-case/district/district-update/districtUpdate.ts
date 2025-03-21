import { CustomError } from "../../../../../../shared/domain/errors/custom.error";
import { TransactionManagerRepository } from "../../../../../transaction-db-manager/domain/repositories/transaction-manager/TransactionManagerRepository";
import {
  District,
  DistrictDescription,
  DistrictId,
  DistrictIdMunicipality,
  DistrictName,
  DistrictRepository,
  DistrictState,
  MunicipalityId,
  MunicipalityRepository,
} from "../../../../domain";

export class DistrictUpdate<T = unknown> {
  constructor(
    private repository: DistrictRepository<T>,
    private repositoryTransaction: TransactionManagerRepository<T>,
    private repositoryMunicipality: MunicipalityRepository<T>
  ) {}
  async run(
    id: number,
    id_municipality: number,
    name: string,
    description: string,
    state: boolean
  ): Promise<void> {
    const district = new District(
      new DistrictIdMunicipality(id_municipality),
      new DistrictName(name),
      new DistrictDescription(description),
      new DistrictState(state),
      new DistrictId(id)
    );

    return await this.repositoryTransaction.runInTransaction(async (tx) => {
      const districtDb = await this.repository.getOneById(
        new DistrictId(id),
        tx
      );

      if (!districtDb) {
        throw CustomError.notFound("Id district not found");
      }
      const municipalityDb = await this.repositoryMunicipality.getOneById(new MunicipalityId(id_municipality));
      if(!municipalityDb){
        throw CustomError.notFound("Invalid foreign key. The provided 'id_municipality' does not exist");
      }
      return this.repository.update(district, tx);
    });
  }
}
