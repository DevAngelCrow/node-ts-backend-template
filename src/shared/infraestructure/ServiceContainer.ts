
import { ExampleCreate, ExampleDelete, ExampleEdit, ExampleGetAll, ExampleGetOneById } from "../../application/use-case";
import { ImplExampleRepository } from "../../infrastructure/implementation";

const exampleRepository = new ImplExampleRepository();

export const ServiceContainer = {
    example: {
        create: new ExampleCreate(exampleRepository),
        update: new ExampleEdit(exampleRepository),
        getOneById: new ExampleGetOneById(exampleRepository),
        getAll: new ExampleGetAll(exampleRepository),
        delete: new ExampleDelete(exampleRepository)
    }
};