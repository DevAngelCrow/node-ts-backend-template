import { TransactionManagerRepository } from "../../../../../../shared/domain/domain-container/DomainContainer";
import {
  Address,
  AddressActive,
  AddressBlock,
  AddressCurrent,
  AddressDescription,
  AddressHouseNumber,
  AddressIdDistrict,
  AddressIdPeople,
  AddressNeighborhood,
  AddressPathWay,
  AddressRepository,
  AddressStreet,
  AddressStreetNumber,
} from "../../../../domain";

export class AddressCreate<T = unknown> {
  constructor(
    private repository: AddressRepository,
    private repositoryTransaction: TransactionManagerRepository<T>
  ) {}

  async run(
    street: string,
    street_number: string,
    neighborhood: string,
    id_district: number,
    house_number: number,
    block: string,
    pathway: string,
    description: string,
    id_people: number,
    active: boolean = true,
    current: boolean = true
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
      new AddressDescription(description)
    );

    return this.repositoryTransaction.runInTransaction(async (tx) => {
      await this.repository.changePlaceResidence(address.id_people, tx);
      await this.repository.create(address, tx);
    });
  }
}
