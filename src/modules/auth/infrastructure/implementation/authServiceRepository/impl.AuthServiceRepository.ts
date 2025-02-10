import { envs } from "../../../../../shared/infrastructure/config/envs";
import { AuthServiceRepository, PeopleEmail, PeopleId, PeopleRepository, User, UserPassword, UserRepository } from "../../../domain";
import jwt, { SignOptions } from "jsonwebtoken";
import bycrypt from "bcryptjs";
import { CustomError } from "../../../../../shared/domain/errors/custom.error";
export class ImplAuthServiceRepository implements AuthServiceRepository {
  private secretKey = envs.JWT_SECRET;
  private expirationJWT: number = envs.JWT_EXPIRATION;
  constructor(private repositoryUser: UserRepository, private repositoryPeople: PeopleRepository){}
  
  generateToken(user: User): string {
    try {
      const payload = { username: user.user_name.value };
      const options: SignOptions = {
        expiresIn: this.expirationJWT,
        algorithm: "HS256",
      };
      return jwt.sign(payload, this.secretKey as string, options);
    } catch (error) {
      throw new Error("Method not implemented")
    }
  }
  verifyToken(token: string): unknown {
    return jwt.verify(token, this.secretKey);
  }
  comparePassword(plain: string, hashed: string): boolean {
    try {
      return bycrypt.compareSync(plain, hashed);
    } catch (error) {
      throw new Error("Error in the comparation password");
    }
  }
  async authenticateUser(email: PeopleEmail, password: UserPassword): Promise<{ user: User; token: string; }> {
    try {
      const person = await this.repositoryPeople.findByEmail(email);
      
      if(!person){
        throw CustomError.unauthorized("Invalid credentials");
      }
      
      
      const user = await this.repositoryUser.findByEmailPeople(new PeopleId(person.id?.value!));

      
      if(!user){
        throw CustomError.unauthorized("Invalid credentials");
      }

      const passwordComparison = await this.comparePassword(password.value, user.password.value);

      if(!passwordComparison){
        throw CustomError.unauthorized("Invalid credentials")
      }

      const token = this.generateToken(user);

      return { user, token};
    } catch (error) {
      console.log(error, 'error autenticacion authenticateUser')
      throw CustomError.unauthorized("Invalid credentials")
    }
  }
  async hashPassword(password: UserPassword): Promise<UserPassword> {
    const saltRounds = 10;
    const hashedPassword = await bycrypt.hash(password.value, saltRounds);

    const passwordFormated = new UserPassword(hashedPassword);

    return passwordFormated;
  }
}
