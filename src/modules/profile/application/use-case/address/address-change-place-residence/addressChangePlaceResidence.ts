import { TransactionManagerRepository } from "../../../../../../shared/domain/domain-container/DomainContainer";
import { AddressIdPeople, AddressRepository } from "../../../../domain";

export class AddressChangePlaceResidence <T>{
    constructor(private repository: AddressRepository){}

    async (id: number) : Promise<void> {
        
            return this.repository.changePlaceResidence(new AddressIdPeople(id));
        
    }
}