import { envs } from "../../../../../shared/infrastructure/config/envs";
import {
  AuthServiceRepository,
  PeopleEmail,
  PeopleId,
  PeopleRepository,
  User,
  UserPassword,
  UserRepository,
} from "../../../domain";
import jwt, { SignOptions } from "jsonwebtoken";
import bycrypt from "bcryptjs";
import { CustomError } from "../../../../../shared/domain/errors/custom.error";
export class ImplAuthServiceRepository implements AuthServiceRepository {
  private secretKey = envs.JWT_SECRET;
  private expirationJWT: number = envs.JWT_EXPIRATION;
  constructor(
    private repositoryUser: UserRepository,
    private repositoryPeople: PeopleRepository
  ) {}

  generateToken(user: User): string {
    try {
      const payload = { username: user.user_name.value };
      const options: SignOptions = {
        expiresIn: this.expirationJWT,
        algorithm: "HS256",
      };
      return jwt.sign(payload, this.secretKey as string, options);
    } catch (error) {
      throw CustomError.unauthorized("Internal server error to generate Token");
    }
  }
  async verifyToken<T>(token: string): Promise<T | null> {
    try {
      const decode = jwt.verify(token, this.secretKey);

      if (!decode) {
        return null;
      }
      return decode as T;
    } catch (error) {
      throw CustomError.unauthorized("Invalid credentials");
    }
  }
  comparePassword(plain: string, hashed: string): boolean {
    try {
      return bycrypt.compareSync(plain, hashed);
    } catch (error) {
      throw CustomError.unauthorized("Invalid credentials");
    }
  }
  async authenticateUser(
    email: PeopleEmail,
    password: UserPassword
  ): Promise<{ user: User; token: string }> {
    try {
      const person = await this.repositoryPeople.findByEmail(email);

      if (!person) {
        throw CustomError.unauthorized("Invalid credentials");
      }

      const user = await this.repositoryUser.findByEmailPeople(
        new PeopleId(person.getId.value)
      );

      if (!user) {
        throw CustomError.unauthorized("Invalid credentials");
      }

      const passwordComparison = await this.comparePassword(
        password.value,
        user.password.value
      );

      if (!passwordComparison) {
        throw CustomError.unauthorized("Invalid credentials");
      }

      const token = this.generateToken(user);

      return { user, token };
    } catch (error) {
      throw CustomError.unauthorized("Invalid credentials");
    }
  }

  async hashPassword(password: UserPassword): Promise<UserPassword> {
    try {
      const saltRounds: number = 10;
      const hashedPassword: string = await bycrypt.hash(
        password.value,
        saltRounds
      );

      const passwordFormated: UserPassword = new UserPassword(hashedPassword);

      return passwordFormated;
    } catch (error) {
      throw CustomError.unauthorized("Error in hash password");
    }
  }
}
