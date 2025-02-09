import {  PeopleId, PeopleRepository, PeopleStatusName, PeopleStatusRepository } from "../../../../domain";
import { CustomError } from "../../../../../../shared/domain/errors/custom.error";

export class PeopleDelete{
    constructor(private repository: PeopleRepository, private repositoryPeopleStatus: PeopleStatusRepository){}

    async run(id: number) : Promise<void> {
        
        await this.repository.getOneById(new PeopleId(id));
        const id_status = await this.repositoryPeopleStatus.getOneById(new PeopleStatusName("inactive"));
        if(!id_status){
            throw CustomError.notFound("Status not found")
        }
        return this.repository.delete(new PeopleId(id), id_status);
    }
}