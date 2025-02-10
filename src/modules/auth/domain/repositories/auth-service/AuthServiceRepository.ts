import { User } from "../../entities";
import { PeopleEmail, UserPassword } from "../../value-object";

export interface AuthServiceRepository {
    generateToken(user: User) : string;
    verifyToken(token: string) : unknown;
    comparePassword(plain: string, hashed: string) : boolean;
    AuthenticateUser(email: PeopleEmail, password: UserPassword) : Promise<{user: User; token: string}>;  
}