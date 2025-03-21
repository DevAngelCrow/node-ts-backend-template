import { Department, DepartmentRepository } from "../../../../domain";

export class DepartmentGet {
    constructor(private repository: DepartmentRepository){}
    
    async run() : Promise<Department[]>{
        return this.repository.getAll();
    }
}