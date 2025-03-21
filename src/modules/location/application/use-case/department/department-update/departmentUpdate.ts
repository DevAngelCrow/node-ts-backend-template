import { CustomError } from "../../../../../../shared/domain/errors/custom.error";
import { TransactionManagerRepository } from "../../../../../transaction-db-manager/domain/repositories/transaction-manager/TransactionManagerRepository";
import {
  CountryId,
  CountryRepository,
  Department,
  DepartmentDescription,
  DepartmentId,
  DepartmentIdCountry,
  DepartmentName,
  DepartmentRepository,
} from "../../../../domain";

export class DepartmentUpdate<T> {
  constructor(
    private repository: DepartmentRepository,
    private repositoryTransaction: TransactionManagerRepository<T>,
    private repositoryCountry: CountryRepository
  ) {}

  async run(
    id: number,
    name: string,
    description: string,
    id_country: number
  ): Promise<void> {
    const department = new Department(
      new DepartmentName(name),
      new DepartmentDescription(description),
      new DepartmentIdCountry(id_country),
      new DepartmentId(id)
    );

    return await this.repositoryTransaction.runInTransaction(async (tx) => {
      const departmentDd = await this.repository.getOneById(department.id!, tx);

      if (!departmentDd) {
        throw CustomError.notFound("Id department not found");
      }

      const countryDb = await this.repositoryCountry.getOneById(
        new CountryId(id_country),
        tx
      );
      if (!countryDb) {
        throw CustomError.notFound(
          JSON.stringify({
            error: "Invalid foreign key",
            message: "The provided 'id_country does not exist",
          })
        );
      }

      return this.repository.update(department, tx);
    });
  }
}
