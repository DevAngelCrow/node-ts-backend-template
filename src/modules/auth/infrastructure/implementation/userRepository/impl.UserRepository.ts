import {
  PeopleId,
  StatusUserName,
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
import { EntityManager } from "typeorm";
import DateTimeService from "../../../../../shared/infrastructure/services/date-time/date.time.services";

export class ImplUserRepository implements UserRepository<EntityManager> {
  constructor(private entityManager: EntityManager) {}

  private users: User[] = [];
  async findByEmailPeople(
    id: PeopleId,
    manager: EntityManager = this.entityManager
  ): Promise<User | null> {
    try {
      const dt = new DateTimeService().dateTime;

      const userRepo = manager.getRepository(MntUser);
      const userDb = await userRepo
        .createQueryBuilder("mntuser")
        .innerJoin("mntuser.idPeople", "mntPeople")
        .innerJoin("mntuser.idStatus", "nameStatus")
        .select([
          "mntuser.id",
          "mntuser.userName",
          "mntuser.password",
          "mntuser.lastAccess",
          "mntPeople.id",
          "nameStatus.name",
          "nameStatus.id",
        ])
        .where("mntuser.idPeople = :id", { id: id.value })
        .getOne();
      if (!userDb) {
        return null;
      }
      const user = {
        id: userDb.id,
        id_people: userDb.idPeople.id,
        user_name: userDb.userName,
        password: userDb.password,
        status: { id_status: userDb.idStatus.id, name: userDb.idStatus.name },
        last_access: dt.now().toJSDate(),
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
  async create(
    user: User,
    manager: EntityManager = this.entityManager
  ): Promise<void> {
    try {
      const userRepo = manager.getRepository(MntUser);
      const newUser = await userRepo.create({
        userName: user.user_name.value,
        password: user.password.value,
        idPeople: { id: user.id_people.value },
        idStatus: { id: user.id_status.value },
      });

      await userRepo.save(newUser);
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

  async updateDateAccess(
    id: UserId,
    lastAccess: UserLastAccess,
    manager: EntityManager = this.entityManager
  ): Promise<void> {
    try {
      //const dt = new DateTimeService().dateTime;
      const userRepo = manager.getRepository(MntUser);
      await userRepo.update(
        { id: id.value },
        {
          lastAccess: lastAccess.value,
        }
      );
    } catch (error) {
      throw CustomError.internalServer("Internal server error")
    }
  }
  private mapToDomain(user: PostgresUser): User {
    return new User(
      new UserIdPeople(user.id_people),
      new UserName(user.user_name),
      new UserPassword(user.password),
      new UserIdStatus(user.status.id_status),
      new UserLastAccess(user.last_access),
      new UserId(user.id),
      new StatusUserName(user.status.name)
    );
  }
}
