import { CustomError } from "../../../../../../shared/domain/errors/custom.error";
import { Address, AddressId, AddressRepository } from "../../../../domain";

export class AddressGetOneById{
    constructor(private repository: AddressRepository){}

    async run(id: number) : Promise<Address | null >{
        const address = await this.repository.getOneById(new AddressId(id));
    
        if(!address){
            throw CustomError.notFound("Address not found")
        }

        return address;

    }
}