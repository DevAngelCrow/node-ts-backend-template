import {
  PeopleStatus,
  PeopleStatusDescription,
  PeopleStatusId,
  PeopleStatusName,
  PeopleStatusRepository,
} from "../../../domain";
import { CustomError } from "../../../../../shared/domain/errors/custom.error";
import { PostgresPeopleStatus } from "../../../../../shared/domain/types";
import { EntityManager } from "typeorm";
import { CtlStatusPeople } from "../../../../../shared/infrastructure/db/entities/CtlStatusPeople";

export class ImplPeopleStatusRepository implements PeopleStatusRepository {
  private people_status: PeopleStatus[] = [];
  constructor(private entityManager: EntityManager){}
  getAll(): Promise<PeopleStatus[]> {
    throw new Error("Method not implemented.");
  }
  async getOneById(status_name: PeopleStatusName, manager: EntityManager = this.entityManager): Promise<PeopleStatusId | null> {
    try {
      const peopleStatusRepo = manager.getRepository(CtlStatusPeople);
      const peopleStatus = await peopleStatusRepo.findOne({
        where: {
          name: status_name.value
        },
        select: {
          id: true,
          name: true,
          description: true
        }
      })
      if (!peopleStatus) {
         return null;
      }

      return new PeopleStatusId(+peopleStatus.id);

    } catch (error) {
      throw CustomError.internalServer("Internal server error");
    }
    
  }
  private mapToDomain(peopleStatus: PostgresPeopleStatus): PeopleStatus {
    return new PeopleStatus(
      new PeopleStatusName(peopleStatus.name),
      new PeopleStatusDescription(peopleStatus?.description),
      new PeopleStatusId(peopleStatus.id),
    );
  }
}
