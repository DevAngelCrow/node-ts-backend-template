import { CustomError, ExampleId, ExampleRepository } from "../../../../domain";

export class ExampleDelete {
    constructor(private respository: ExampleRepository){}

    async run(id: number) : Promise<void>{
        const example = await this.respository.getOneById(new ExampleId(id));

        if(!example){
            throw CustomError.notFound("Example not found");
        }

        return this.respository.delete(new ExampleId(id));
    }
}