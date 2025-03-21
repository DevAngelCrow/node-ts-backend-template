import { CustomError } from "../../../../../../shared/domain/errors/custom.error";
import { TransactionManagerRepository } from "../../../../../transaction-db-manager/domain/repositories/transaction-manager/TransactionManagerRepository";
import {
  DepartmentId,
  DepartmentRepository,
  Municipality,
  MunicipalityDescription,
  MunicipalityIdDepartment,
  MunicipalityName,
  MunicipalityRepository,
} from "../../../../domain";

export class MunicipalityCreate<T> {
  constructor(
    private repository: MunicipalityRepository,
    private repositoryTransaction: TransactionManagerRepository<T>,
    private repositoryDepartment: DepartmentRepository
  ) {}

  async run(
    id_department: number,
    name: string,
    description: string
  ): Promise<void> {
    const municipality = new Municipality(
      new MunicipalityIdDepartment(id_department),
      new MunicipalityName(name),
      new MunicipalityDescription(description)
    );

    return await this.repositoryTransaction.runInTransaction(async () => {
      const department = await this.repositoryDepartment.getOneById(
        new DepartmentId(id_department)
      );
      if (!department) {
        throw CustomError.notFound(
          "Invalid foreign key. The provided 'id_department does not exist"
        );
      }

      return this.repository.create(municipality);
    });
  }
}
