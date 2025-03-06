import { People, PeopleId, PeopleRepository } from "../../../../../../shared/domain/domain-container/DomainContainer";
import { CustomError } from "../../../../../../shared/domain/errors/custom.error";
export class PeopleGetOneById{
    constructor(private respository: PeopleRepository){}

    async run(id: number) : Promise<People | null>{
        const people = await this.respository.getOneById(new PeopleId(id));

        if(!people){
            throw CustomError.notFound("People not found");
        }

        return people;
    }
}