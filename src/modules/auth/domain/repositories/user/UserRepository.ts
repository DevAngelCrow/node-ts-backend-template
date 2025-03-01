import { User } from "../../entities";
import { PeopleId, UserId, UserLastAccess } from "../../value-object";

export interface UserRepository <T = unknown>{
    create(user: User, transactionClient?: T) : Promise<void>;
    update(user: User, transactionClient?: T) : Promise<void>;
    getAll() : Promise<User[]>;
    getById(id: UserId, transactionClient?: T) : Promise<User | null>;
    delete(id: UserId, transactionClient?: T) : Promise<void>;
    findByEmailPeople(id: PeopleId, transactionClient?: T) : Promise<User | null>;
    updateDateAccess(id: UserId, lastAccess: UserLastAccess, transactionClient?: T) : Promise<void>;
}