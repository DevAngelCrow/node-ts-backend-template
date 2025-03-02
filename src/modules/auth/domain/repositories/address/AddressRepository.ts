import { Address } from "../../entities/address/address.entity";
import { AddressId } from "../../value-object";

export interface AddressRepository <T>{
    create(address: Address, transaction?: T) : Promise<void>;
    update(address: Address, transaction?: T) : Promise<void>;
    getAll() : Promise<Address[]>;
    getOneById(id: AddressId) : Promise<Address | null>;
    delete(id: AddressId, transaction?: T) : Promise<void>
}