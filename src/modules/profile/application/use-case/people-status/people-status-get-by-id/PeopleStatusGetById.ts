import { CustomError } from "../../../../../../shared/domain/errors/custom.error";
import {
  PeopleStatus,
  PeopleStatusId,
  PeopleStatusRepository,
} from "../../../../domain";

export class PeopleStatusGetById {
  constructor(private repository: PeopleStatusRepository) {}

  async run(id: number): Promise<PeopleStatus | null> {
    const peopleStatus = await this.repository.getOneById(
      new PeopleStatusId(id)
    );
    if (!peopleStatus) {
      throw CustomError.notFound("Id people status not found");
    }
    return peopleStatus;
  }
}
