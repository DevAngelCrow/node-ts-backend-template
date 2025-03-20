import { CustomError } from "../../../../../../shared/domain/errors/custom.error";
import { District, DistrictId, DistrictRepository } from "../../../../domain";

export class DistrictGetById <T = unknown>{
    constructor(private repository: DistrictRepository<T>){}

    async run (id: number) : Promise<District | null> {
        const district = await this.repository.getOneById(new DistrictId(id));

        if(!district){
            throw CustomError.notFound("Id district not found");
        }

        return district;
    }
}