import { CustomError } from "../../../../../../shared/domain/errors/custom.error";
import { TransactionManagerRepository } from "../../../../../transaction-db-manager/domain/repositories/transaction-manager/TransactionManagerRepository";
import {
  DepartmentId,
  DepartmentRepository,
  Municipality,
  MunicipalityDescription,
  MunicipalityId,
  MunicipalityIdDepartment,
  MunicipalityName,
  MunicipalityRepository,
} from "../../../../domain";

export class MunicipalityUpdate<T> {
  constructor(
    private repository: MunicipalityRepository,
    private repositoryTransaction: TransactionManagerRepository<T>,
    private repositoryDepartment: DepartmentRepository
  ) {}

  async run(
    id: number,
    id_department: number,
    name: string,
    description: string
  ): Promise<void> {
    const municipality = new Municipality(
      new MunicipalityIdDepartment(id_department),
      new MunicipalityName(name),
      new MunicipalityDescription(description),
      new MunicipalityId(id)
    );

    return await this.repositoryTransaction.runInTransaction(async (tx) => {
      const municipalityDb = await this.repository.getOneById(municipality.id!, tx);

      if (!municipalityDb) {
        throw CustomError.notFound("Id municipality not found");
      }
      const departmentDb = await this.repositoryDepartment.getOneById(
        new DepartmentId(id_department),
        tx
      );
      if (!departmentDb) {
        throw CustomError.notFound(
          "Invalid foreign key. The provided 'id_department does not exist"
        );
      }

      return this.repository.update(municipality, tx);
    });
  }
}
