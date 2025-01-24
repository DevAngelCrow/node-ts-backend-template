import { CustomError, Example, ExampleId, ExampleRepository, ExampleValue } from "../../../../domain";

export class ExampleEdit{
    constructor(private repository: ExampleRepository){}

    async run(example_name: string, example_id: number): Promise<void>{
        const example = await this.repository.getOneById(new ExampleId(example_id));

        if(!example){
            throw CustomError.notFound("Example not found");
        }

        const exampleUpdate = new Example(
            new ExampleValue(example_name),
            new ExampleId(example_id)
        );

        return this.repository.update(exampleUpdate);
    }
}