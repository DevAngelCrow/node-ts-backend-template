import {
    CountryId,
  PeopleCountryRepository,
  PeopleId,
  PeopleRepository,
  PeopleStatusName,
  PeopleStatusRepository,
} from "../../../../domain";
import { CustomError } from "../../../../../../shared/domain/errors/custom.error";
import { TransactionManagerRepository } from "../../../../../../shared/domain/domain-container/DomainContainer";

export class PeopleDelete <T = unknown> {
  constructor(
    private repository: PeopleRepository,
    private repositoryPeopleStatus: PeopleStatusRepository,
    private repositoryTransaction: TransactionManagerRepository<T>,
    private repositoryPeopleCountry: PeopleCountryRepository
  ) {}

  async run(id: number): Promise<void> {
    return await this.repositoryTransaction.runInTransaction(async (tx) => {
      const idPeople = new PeopleId(id);
      
      await this.repository.getOneById(idPeople, tx);
      const id_status = await this.repositoryPeopleStatus.getOneById(
        new PeopleStatusName("inactive")
      )
      if (!id_status) {
        throw CustomError.notFound("Status not found");
      }

      const countries : CountryId [] = [];

      await this.repositoryPeopleCountry.update(idPeople, countries, tx);

      return this.repository.delete(new PeopleId(id), id_status, tx);
    }).catch((error) => console.log(error, 'error de la transaccion'))
  }
}
