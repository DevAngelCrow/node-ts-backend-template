import { PeopleStatus } from "../../entities";
import { PeopleStatusId } from "../../value-object";

export interface PeopleStatusRepository {
    getOneById(id: PeopleStatusId): Promise<PeopleStatus | null>;
}