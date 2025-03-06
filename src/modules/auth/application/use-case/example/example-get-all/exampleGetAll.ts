import { Example, ExampleRepository } from "../../../../domain";

export class ExampleGetAll{
    constructor(private repository: ExampleRepository){}

    async run() : Promise<Example[]>{
        return await this.repository.getAll();


    }
}