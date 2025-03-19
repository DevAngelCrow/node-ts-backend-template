import { CustomError } from "../../../../../../shared/domain/errors/custom.error";
import { MaritalStatus, MaritalStatusId, MaritalStatusRepository } from "../../../../domain";

export class MaritalStatusGetOneById {
    constructor(private repository: MaritalStatusRepository){}

    async run(id: number) : Promise<MaritalStatus | null>{
        const maritalStatus = await this.repository.getOneById(new MaritalStatusId(id));
        if(!maritalStatus){
            throw CustomError.notFound("Id marital status not found");
        }
        return maritalStatus;
    }
}