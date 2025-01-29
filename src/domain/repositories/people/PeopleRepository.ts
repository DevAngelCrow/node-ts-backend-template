import { People } from "../../entities";
import { PeopleId } from "../../value-object";

export interface PeopleRepository {
  create(example: People): Promise<void>;
  getAll(): Promise<People[]>;
  getOneById(id: PeopleId): Promise<People | null>;
  update(example: People): Promise<void>;
  delete(id: PeopleId): Promise<void>;
}
