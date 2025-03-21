import { CustomError } from "../../../../../../shared/domain/errors/custom.error";
import { Department, DepartmentDescription, DepartmentId, DepartmentIdCountry, DepartmentName, DepartmentRepository } from "../../../../domain";

export class DepartmentDelete {
    constructor(private repository: DepartmentRepository){}

    async run (id: number) : Promise<void> {
        

        const departmentDb = await this.repository.getOneById(new DepartmentId(id));

        if(!departmentDb){
            throw CustomError.notFound("Id department not found");
        }

        return this.repository.delete(departmentDb.id!);
    }
}