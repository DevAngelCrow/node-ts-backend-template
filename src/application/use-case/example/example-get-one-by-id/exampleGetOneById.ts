import { CustomError, Example, ExampleId, ExampleRepository } from "../../../../domain";

export class ExampleGetOneById{
    constructor(private repository: ExampleRepository){}

    async run(id: number) : Promise<Example>{
        const example = await this.repository.getOneById(new ExampleId(id));

        if(!example){
            throw CustomError.notFound("Example not found");
        }

        return example;
    }
}