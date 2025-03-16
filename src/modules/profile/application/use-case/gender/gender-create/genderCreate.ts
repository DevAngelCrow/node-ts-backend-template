import { Gender, GenderName, GenderRepository } from "../../../../domain";

export class GenderCreate {
    constructor(private repository: GenderRepository){}

    async run(
        name: string
    ) : Promise<void> {
        return this.repository.create(new Gender(
            new GenderName(name)
        ))
    }
}