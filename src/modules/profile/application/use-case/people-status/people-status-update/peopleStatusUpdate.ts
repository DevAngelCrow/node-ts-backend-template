import { CustomError } from "../../../../../../shared/domain/errors/custom.error";
import { PeopleStatus, PeopleStatusDescription, PeopleStatusId, PeopleStatusName, PeopleStatusRepository } from "../../../../domain";

export class PeopleStatusUpdate {
    constructor(private repository: PeopleStatusRepository){}

    async run(id: number, name: string, description: string) : Promise<void> {
        const peopleStatus = new PeopleStatus(
            new PeopleStatusName(name),
            new PeopleStatusDescription(description),
            new PeopleStatusId(id)
        );

        const peopleStatusDb = await this.repository.getOneById(peopleStatus?.id!);

        if(!peopleStatusDb){
            throw CustomError.notFound("Id people status not found");
        }

        return this.repository.update(peopleStatus);
    }
}