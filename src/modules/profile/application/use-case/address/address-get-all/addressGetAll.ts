import { Address, AddressRepository } from "../../../../domain";

export class AddresGetAll{
    constructor(private repository: AddressRepository){}

    async run() : Promise<Address[]>{
        return this.repository.getAll();
    }
}