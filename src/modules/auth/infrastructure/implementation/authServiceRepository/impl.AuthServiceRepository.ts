import { envs } from "../../../../../shared/infraestructure/config/envs";
import { AuthServiceRepository, User } from "../../../domain";
import jwt, { SignOptions } from "jsonwebtoken";
import bycrypt from "bcryptjs";
export class ImplAuthServiceRepository implements AuthServiceRepository {
  private secretKey = envs.JWT_SECRET;
  private expirationJWT: number = envs.JWT_EXPIRATION;

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
}
