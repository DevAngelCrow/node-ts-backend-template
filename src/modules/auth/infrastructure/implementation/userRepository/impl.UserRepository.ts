import {
  PeopleId,
  User,
  UserId,
  UserIdPeople,
  UserIdStatus,
  UserLastAccess,
  UserName,
  UserPassword,
  UserRepository,
} from "../../../domain";
import { PostgresUser } from "../../../../../shared/domain/types/postgres-types/postgresUser";
import { CustomError } from "../../../../../shared/domain/errors/custom.error";
import AppDataSource from "../../../../../shared/infrastructure/db/TypeOrmConfig";
import { MntUser } from "../../../../../shared/infrastructure/db/entities/MntUser";

export class ImplUserRepository implements UserRepository {
  private users: User[] = [];
  async findByEmailPeople(id: PeopleId): Promise<User | null> {
    try {
      console.log(id, "idPeople");
      const userRepo = AppDataSource.dataSource.getRepository(MntUser);

      const userDb = await userRepo.findOne({
        where: {
          idPeople: { id: id.value },
        },
        select: {
          password: true,
          lastAccess: true,
          userName: true,
          id: true,
          idPeople: {
            id: true,
          },
          idStatus: {
            id: true,
          },
        },
      });

      if (!userDb) {
        return null;
      }

      const user = {
        id: userDb.id,
        id_people: userDb.idPeople.id,
        user_name: userDb.userName,
        password: userDb.password,
        id_status: userDb.idStatus.id,
        last_access: userDb.lastAccess,
      };

      if (!user) {
        return null;
      }
      return this.mapToDomain(user);
    } catch (error) {
      throw CustomError.internalServer(
        "Internal server error in find email people"
      );
    }
  }
  async create(user: User): Promise<void> {
    try {
      const userRepo = AppDataSource.dataSource.getRepository(MntUser);

      const newUser = await userRepo.create({
        userName: user.user_name.value,
        password: user.password.value,
        idPeople: { id: user.id_people.value },
        idStatus: { id: user.id_status.value },
      });

      const savedUser = await userRepo.save(newUser);
    } catch (error) {
      throw CustomError.internalServer("Internal server error in create user");
    }
  }
  update(user: User): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getAll(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
  getById(id: UserId): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  delete(id: UserId): Promise<void> {
    throw new Error("Method not implemented.");
  }

  private mapToDomain(user: PostgresUser): User {
    return new User(
      new UserIdPeople(user.id_people),
      new UserName(user.user_name),
      new UserPassword(user.password),
      new UserIdStatus(user.id_status),
      new UserLastAccess(user.last_access),
      new UserId(user.id)
    );
  }
}
