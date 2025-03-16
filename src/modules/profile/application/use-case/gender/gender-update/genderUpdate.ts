import { Gender, GenderId, GenderName, GenderRepository } from "../../../../domain";

export class GenderUpdate{
    constructor(private repository: GenderRepository){}

    async run(id: number, name: string) : Promise<void> {
        const gender = new Gender(
            new GenderName(name),
            new GenderId(id)
        );

        return this.repository.update(gender);
    }
}