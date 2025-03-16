import { Gender, GenderRepository } from "../../../../domain";

export class GenderGetAll{
    constructor(private repository: GenderRepository){}

    async run() : Promise<Gender[]>{
        return this.repository.getAll();
    }
}