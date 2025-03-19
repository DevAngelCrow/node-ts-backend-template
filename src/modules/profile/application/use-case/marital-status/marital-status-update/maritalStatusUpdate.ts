import { CustomError } from "../../../../../../shared/domain/errors/custom.error";
import { MaritalStatus, MaritalStatusId, MaritalStatusName, MaritalStatusRepository } from "../../../../domain";

export class MaritalStatusUpdate {
    constructor(private repository: MaritalStatusRepository){}

    async run (id: number, name: string) : Promise<void> {

        const maritalStatus = new MaritalStatus(
            new MaritalStatusName(name),
            new MaritalStatusId(id),
        );

        const maritalStatusDB = await this.repository.getOneById(maritalStatus.id!);

        if(!maritalStatusDB){
            throw CustomError.notFound("Id marital status not found");
        }

        return this.repository.update(maritalStatus);
    }
}