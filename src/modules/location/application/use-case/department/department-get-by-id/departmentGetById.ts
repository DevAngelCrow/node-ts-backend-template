import { CustomError } from "../../../../../../shared/domain/errors/custom.error";
import { Department, DepartmentId, DepartmentRepository } from "../../../../domain";

export class DepartmentGetById{
    constructor(private repository: DepartmentRepository){}

    async run (id: number) : Promise<Department | null>{
        const department = await this.repository.getOneById(new DepartmentId(id));

        if(!department){
            throw CustomError.notFound("Id department not found");
        }

        return department;
    }
}