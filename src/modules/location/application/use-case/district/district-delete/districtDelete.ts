import { CustomError } from "../../../../../../shared/domain/errors/custom.error";
import { DistrictId, DistrictRepository } from "../../../../domain";

export class DistrictDelete <T = unknown>{
    constructor(private repository: DistrictRepository<T>){}

    async run (id: number) : Promise<void> {
        const district = await this.repository.getOneById(new DistrictId(id));
        if(!district){
            throw CustomError.notFound("Id district not found")
        }

        return this.repository.delete(district.id!)
    }
}