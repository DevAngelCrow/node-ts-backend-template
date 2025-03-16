import { GenderId, GenderRepository } from "../../../../domain";

export class GenderDelete{
    constructor(private repository: GenderRepository){}

    async run(id: number) : Promise<void> {
        return this.repository.delete(new GenderId(id));
    }
}