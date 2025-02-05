import { CustomError, PeopleStatus, PeopleStatusId, PeopleStatusRepository } from "../../../../domain";

export class PeopleStatusGetById {
    constructor(private repository: PeopleStatusRepository){}

    async run(id: number) : Promise<PeopleStatus | null>{
        const peopleStatus =  await this.repository.getOneById(new PeopleStatusId(id));
        if(!peopleStatus){
            throw CustomError.notFound("Status not found")
        }
        
        return peopleStatus;
    }
}