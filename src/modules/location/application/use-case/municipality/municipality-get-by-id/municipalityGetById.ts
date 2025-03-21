import { CustomError } from "../../../../../../shared/domain/errors/custom.error";
import { Municipality, MunicipalityId, MunicipalityRepository } from "../../../../domain";

export class MunicipalityGetById{
    constructor(private repository: MunicipalityRepository){}

    async run(id: number) : Promise<Municipality | null> {
        const municipality = await this.repository.getOneById(new MunicipalityId(id));
        if(!municipality){
            throw CustomError.notFound("Id municipality not found")
        }
        return municipality;
    }
}