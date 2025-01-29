import { CustomError, People, PeopleId, PeopleRepository } from "../../../../domain";

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