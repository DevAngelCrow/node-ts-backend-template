import { CustomError } from "../../../../../../shared/domain/errors/custom.error";
import { AddressId, AddressRepository } from "../../../../domain";

export class AddressDelete{
    constructor(private repository: AddressRepository){}

    async run(id: number) : Promise<void> {
        const addressId = new AddressId(id);
        const address = await this.repository.getOneById(addressId);

        if(!address){
            throw CustomError.notFound('Address not found');
        }

        return this.repository.delete(addressId);
    }
}