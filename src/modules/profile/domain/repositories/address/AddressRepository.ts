import { Address } from "../../../../profile/domain/entities/address/address.entity";
import { AddressId, AddressIdPeople } from "../../value-object";

export interface AddressRepository <T = unknown>{
    create(address: Address, transaction?: T) : Promise<void>;
    update(address: Address, transaction?: T) : Promise<void>;
    getAll() : Promise<Address[]>;
    getOneById(id: AddressId) : Promise<Address | null>;
    delete(id: AddressId, transaction?: T) : Promise<void>;
    changePlaceResidence(id: AddressIdPeople, transaction?: T) : Promise<void>
}