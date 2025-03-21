import { CustomError } from "../../../../../../shared/domain/errors/custom.error";
import { MunicipalityId, MunicipalityRepository } from "../../../../domain";

export class MunicipalityDelete{
    constructor(private repository: MunicipalityRepository){}

    async run(id: number): Promise<void>{
        const municipality = await this.repository.getOneById(new MunicipalityId(id));

        if(!municipality){
            throw CustomError.notFound("Id municipality not found");
        }

        return this.repository.delete(municipality.id!);
    }
}