import { Example, ExampleRepository, ExampleValue } from "../../../../domain";

export class ExampleCreate {
    constructor(private respository: ExampleRepository){}

    async run(example_name: string) : Promise<void>{
        const example = new Example(new ExampleValue(example_name));

        return this.respository.create(example);
    }
}