import { CustomError } from "../../../../../../shared/domain/errors/custom.error";
import { User, UserId, UserIdPeople, UserIdStatus, UserLastAccess, UserName, UserPassword, UserRepository } from "../../../../domain";

export class UserUpdate {
  constructor(private repository: UserRepository) {}

  async run(
    id: number,
    id_people: number,
    user_name: string,
    password: string,
    id_status: number,
    last_access: Date
  ): Promise<void> {
    const userDb =  await this.repository.getById(new UserId(id));

    if(!userDb){
        throw CustomError.notFound("User not found");
    }

    const user = new User(
        new UserIdPeople(id_people),
        new UserName(user_name),
        new UserPassword(password),
        new UserIdStatus(id_status),
        new UserLastAccess(last_access),
    );

    return this.repository.update(user);
  }
}
