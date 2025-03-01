import { PeopleStatus } from "../../entities";
import { PeopleStatusId, PeopleStatusName } from "../../value-object";

export interface PeopleStatusRepository<T = unknown>{
    getOneById(status_name: PeopleStatusName, transactionClient?: T): Promise<PeopleStatusId | null>;
    getAll():Promise<PeopleStatus[]>
}