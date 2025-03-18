import { CustomError } from "../../../../../../shared/domain/errors/custom.error";
import { Gender, GenderId, GenderName, GenderRepository } from "../../../../domain";

export class GenderUpdate{
    constructor(private repository: GenderRepository){}

    async run(id: number, name: string) : Promise<void> {
        const gender = new Gender(
            new GenderName(name),
            new GenderId(id)
        );

        const genderDB = await this.repository.getOneById(gender.id!);

        if(!genderDB){
            throw CustomError.notFound("Id gender not found");
        }

        return this.repository.update(gender);
    }
}