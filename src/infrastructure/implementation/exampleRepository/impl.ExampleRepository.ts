import { Example, ExampleId, ExampleRepository, PostgresExample } from "../../../domain";
export class ImplExampleRepository implements ExampleRepository {
    private examples : Example[] = [];
    //use a property with implemented ORM
    create(example: Example): Promise<void> {
       return new Promise((resolve, reject) =>{
        //console.log("Ejemplo creado", example);
        resolve();
       })
    }
    getAll(): Promise<Example[]> {
        //todo find all records in the database
        /* 
        
        */
        return new Promise((resolve, reject)=>{
            resolve(this.examples)
        });
    }
    getOneById(id: ExampleId): Promise<Example | null> {
        throw new Error("Method not implemented.");
    }
    update(example: Example): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(id: ExampleId): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}