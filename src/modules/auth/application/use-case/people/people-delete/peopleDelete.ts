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

export class PeopleDelete {
  constructor(
    private repository: PeopleRepository,
    private repositoryPeopleStatus: PeopleStatusRepository,
    private repositoryTransaction: TransactionManagerRepository,
    private repositoryPeopleCountry: PeopleCountryRepository
  ) {}

  async run(id: number): Promise<void> {
    return this.repositoryTransaction.runInTransaction(async () => {
      const idPeople = new PeopleId(id);
      await this.repository.getOneById(idPeople);
      const id_status = await this.repositoryPeopleStatus.getOneById(
        new PeopleStatusName("inactive")
      );
      if (!id_status) {
        throw CustomError.notFound("Status not found");
      }

      const prueba : CountryId [] = [];

      await this.repositoryPeopleCountry.update(idPeople, prueba);

      return this.repository.delete(new PeopleId(id), id_status);
    }).catch((error) => console.log(error, 'error de la transaccion'))
  }
}
