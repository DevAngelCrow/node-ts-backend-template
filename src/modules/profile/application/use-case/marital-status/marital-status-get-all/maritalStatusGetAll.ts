import { MaritalStatus, MaritalStatusRepository } from "../../../../domain";

export class MaritalStatusGetAll {
    constructor(private repository: MaritalStatusRepository){}

    async run () : Promise<MaritalStatus[]> {
        return this.repository.getAll();
    }
}