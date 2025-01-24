import { Example } from "../../entities";
import { ExampleId } from "../../value-object";


export interface ExampleRepository {
    create(example: Example) : Promise<void>;
    getAll():Promise<Example[]>;
    getOneById(id: ExampleId) : Promise<Example | null>;
    update(example: Example) : Promise<void>;
    delete(id: ExampleId) : Promise<void>; 
}