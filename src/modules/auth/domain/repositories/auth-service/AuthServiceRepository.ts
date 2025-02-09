import { User } from "../../entities";

export interface AuthServiceRepository {
    generateToken(user: User) : string;
    verifyToken(token: string) : unknown;
    comparePassword(plain: string, hashed: string) : boolean; 
}