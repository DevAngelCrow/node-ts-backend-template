import { User } from "../../entities";
import { PeopleId } from "../../value-object";

export interface UserRepository{
    findByEmailPeople(id: PeopleId) : Promise<User | null>;
}