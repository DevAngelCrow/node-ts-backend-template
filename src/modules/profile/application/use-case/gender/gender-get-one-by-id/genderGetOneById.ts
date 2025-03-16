import { CustomError } from "../../../../../../shared/domain/errors/custom.error";
import { Gender, GenderId, GenderRepository } from "../../../../domain";

export class GenderGetOneById {
    constructor(private repository: GenderRepository){}

    async run(id: number) : Promise<Gender | null> {

        const gender = await this.repository.getOneById(new GenderId(id));

        if(!gender){
            throw CustomError.notFound("Id gender not found");
        }

        return gender;
    }
}