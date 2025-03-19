import { PeopleStatus } from "../../entities";
import { PeopleStatusId, PeopleStatusName } from "../../value-object";

export interface PeopleStatusRepository<T = unknown>{
    create(people_status: PeopleStatus) : Promise<void>;
    update(people_status: PeopleStatus) : Promise<void>
    getOneByName(status_name: PeopleStatusName, transactionClient?: T): Promise<PeopleStatusId | null>;
    getAll():Promise<PeopleStatus[]>;
    getOneById(status_people_id: PeopleStatusId) : Promise<PeopleStatus | null>
}