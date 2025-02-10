import { User } from "../../entities";
import { PeopleId, UserId } from "../../value-object";

export interface UserRepository{
    create(user: User) : Promise<void>;
    update(user: User) : Promise<void>;
    getAll() : Promise<User[]>;
    getById(id: UserId) : Promise<User | null>;
    delete(id: UserId) : Promise<void>;
    findByEmailPeople(id: PeopleId) : Promise<User | null>;
}