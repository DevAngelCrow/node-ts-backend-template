import { People, User } from "../../entities";
import { PeopleEmail, PeopleId, PeopleStatusId } from "../../value-object";

export interface PeopleRepository<T = unknown>{
  create(people: People, transactionClient?: T): Promise<People>;
  getAll(): Promise<People[]>;
  getOneById(id: PeopleId, transactionClient?: T): Promise<People | null>;
  update(example: People, transactionClient?: T): Promise<void>;
  delete(id: PeopleId, id_status: PeopleStatusId, transactionClient?: T): Promise<void>;
  findByEmail(email: PeopleEmail, transactionClient?: T) : Promise<People | null>;
  createUserWithPerson(people: People, user: User, transactionClient?: T): Promise<void>;
}
