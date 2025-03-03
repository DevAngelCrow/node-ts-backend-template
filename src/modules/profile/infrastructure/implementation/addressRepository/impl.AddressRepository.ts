import { EntityManager } from "typeorm";
import { AddressId, AddressRepository } from "../../../domain";
import { Address } from "../../../../profile/domain/entities/address/address.entity";

export class ImplAddressRepository implements AddressRepository<EntityManager> {
    create(address: Address, transaction?: EntityManager | undefined): Promise<void> {
        throw new Error("Method not implemented.");
    }
    update(address: Address, transaction?: EntityManager | undefined): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<Address[]> {
        throw new Error("Method not implemented.");
    }
    getOneById(id: AddressId): Promise<Address | null> {
        throw new Error("Method not implemented.");
    }
    delete(id: AddressId, transaction?: EntityManager | undefined): Promise<void> {
        throw new Error("Method not implemented.");
    }

}