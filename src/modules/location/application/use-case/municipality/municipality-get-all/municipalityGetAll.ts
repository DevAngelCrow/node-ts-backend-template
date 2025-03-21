import { Municipality, MunicipalityRepository } from "../../../../domain";

export class MunicipalityGetAll {
    constructor(private repository: MunicipalityRepository){}

    async run () : Promise<Municipality[]>{
        return this.repository.getAll();
    }
}