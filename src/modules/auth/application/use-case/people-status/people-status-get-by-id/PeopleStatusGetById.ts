import {  PeopleStatusId, PeopleStatusName, PeopleStatusRepository } from "../../../../domain";
import { CustomError } from "../../../../../../shared/domain/errors/custom.error"; 
export class PeopleStatusGetById {
    constructor(private repository: PeopleStatusRepository){}

    async run(name: string) : Promise<PeopleStatusId | null>{
        const peopleStatus =  await this.repository.getOneById(new PeopleStatusName(name));
        if(!peopleStatus){
            throw CustomError.notFound("Status not found")
        }

        return peopleStatus;
    }
}