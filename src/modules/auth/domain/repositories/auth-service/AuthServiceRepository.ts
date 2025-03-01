import { User } from "../../entities";
import { PeopleEmail, UserId, UserPassword } from "../../value-object";
import { SendMailOptions } from "../../../../email/domain/interfaces";
export interface AuthServiceRepository{
    generateToken(user: User) : string;
    verifyToken<T>(token: string) : Promise<T | null>;
    comparePassword(plain: string, hashed: string) : boolean;
    authenticateUser(email: PeopleEmail, password: UserPassword) : Promise<{user: User; token: string}>;
    hashPassword(password: UserPassword) : Promise<UserPassword>;
    validateEmail(user: User, email: PeopleEmail) : Promise<SendMailOptions>;
    sendEmailValidationLink(token: string) : Promise<void>; 
}