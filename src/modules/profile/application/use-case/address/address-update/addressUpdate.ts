import { CustomError } from "../../../../../../shared/domain/errors/custom.error";
import { TransactionManagerRepository } from "../../../../../../shared/domain/domain-container/DomainContainer";
import {
  Address,
  AddressActive,
  AddressBlock,
  AddressCurrent,
  AddressDescription,
  AddressHouseNumber,
  AddressId,
  AddressIdDistrict,
  AddressIdPeople,
  AddressNeighborhood,
  AddressPathWay,
  AddressRepository,
  AddressStreet,
  AddressStreetNumber,
} from "../../../../domain";

export class AddressUpdate<T = unknown> {
  constructor(
    private repository: AddressRepository,
    private repositoryTransaction: TransactionManagerRepository<T>
  ) {}

  async run(
    id: number,
    street: string,
    street_number: string,
    neighborhood: string,
    id_district: number,
    house_number: number,
    block: string,
    pathway: string,
    description: string,
    id_people: number,
    active: boolean,
    current: boolean
  ): Promise<void> {
    const address = new Address(
      new AddressIdPeople(id_people),
      new AddressStreet(street),
      new AddressStreetNumber(street_number),
      new AddressNeighborhood(neighborhood),
      new AddressIdDistrict(id_district),
      new AddressHouseNumber(house_number),
      new AddressBlock(block),
      new AddressPathWay(pathway),
      new AddressCurrent(current),
      new AddressActive(active),
      new AddressDescription(description),
      new AddressId(id)
    );

    return this.repositoryTransaction.runInTransaction(async (tx) => {
      const addressFind = this.repository.getOneById(address.id!);

      if (!addressFind) {
        throw CustomError.badRequest("Id address not found");
      }
      if (address.current.value) {
        this.repository.changePlaceResidence(address.id_people, tx);
      }
      return this.repository.update(address, tx);
    });
  }
}
