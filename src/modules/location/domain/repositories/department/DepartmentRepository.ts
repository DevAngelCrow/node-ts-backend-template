import { Department } from "../../entities";
import { DepartmentId } from "../../value-object";

export interface DepartmentRepository<T = unknown>{
    create(department: Department, transactionClient?: T): Promise<void>;
    getAll(): Promise<Department[]>;
    getOneById(id: DepartmentId, transactionClient?: T): Promise<Department | null>;
    update(department: Department, transactionClient?: T): Promise<void>;
    delete(id: DepartmentId, transactionClient?: T): Promise<void>;
}