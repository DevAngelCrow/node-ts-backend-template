import { PeopleStatus } from "../../entities";
import { PeopleStatusId, PeopleStatusName } from "../../value-object";

export interface PeopleStatusRepository {
    getOneById(status_name: PeopleStatusName): Promise<PeopleStatusId | null>;
    getAll():Promise<PeopleStatus[]>
}