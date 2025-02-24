import { People, User } from "../../entities";
import { CountryId, PeopleEmail, PeopleId, PeopleStatusId } from "../../value-object";

export interface PeopleRepository {
  create(people: People): Promise<People>;
  getAll(): Promise<People[]>;
  getOneById(id: PeopleId): Promise<People | null>;
  update(example: People): Promise<void>;
  delete(id: PeopleId, id_status: PeopleStatusId): Promise<void>;
  findByEmail(email: PeopleEmail) : Promise<People | null>;
  createUserWithPerson(people: People, user: User): Promise<void>;
}
