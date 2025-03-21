import { CustomError } from "../../../../../../shared/domain/errors/custom.error";
import { TransactionManagerRepository } from "../../../../../transaction-db-manager/domain/repositories/transaction-manager/TransactionManagerRepository";
import {
    CountryId,
    CountryRepository,
  Department,
  DepartmentDescription,
  DepartmentIdCountry,
  DepartmentName,
  DepartmentRepository,
} from "../../../../domain";

export class DepartmentCreate<T> {
  constructor(
    private repository: DepartmentRepository,
    private repositoryTransaction: TransactionManagerRepository<T>,
    private repositoryCountry: CountryRepository,
  ) {}

  async run(
    name: string,
    description: string,
    id_country: number
  ): Promise<void> {
    const department = new Department(
      new DepartmentName(name),
      new DepartmentDescription(description),
      new DepartmentIdCountry(id_country)
    );

    return await this.repositoryTransaction.runInTransaction(async (tx) => {
      const idDepartment = await this.repositoryCountry.getOneById(new CountryId(id_country), tx);
      if(!idDepartment){
        throw CustomError.notFound(JSON.stringify({error: "Invalid foreign key", message: "The provided 'id_country does not exist"}))
      }
      return this.repository.create(department, tx);
    });
  }
}
