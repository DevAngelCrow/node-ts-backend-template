import {
  PeopleStatus,
  PeopleStatusDescription,
  PeopleStatusId,
  PeopleStatusName,
  PeopleStatusRepository,
} from "../../../../../shared/domain/domain-container/DomainContainer";
import { CustomError } from "../../../../../shared/domain/errors/custom.error";
import { PostgresPeopleStatus } from "../../../../../shared/domain/types";
import { EntityManager } from "typeorm";
import { CtlStatusPeople } from "../../../../../shared/infrastructure/db/entities/CtlStatusPeople";
import DateTimeService from "../../../../../shared/infrastructure/services/date-time/date.time.services";

export class ImplPeopleStatusRepository implements PeopleStatusRepository {
  private people_status: PeopleStatus[] = [];
  constructor(private entityManager: EntityManager) {}
  async create(people_status: PeopleStatus): Promise<void> {
    try {
      const peopleStatusRepo =
        this.entityManager.getRepository(CtlStatusPeople);
      const peopleStatus = peopleStatusRepo.create({
        name: people_status.name.value,
        description: people_status?.description?.value,
      });

      await peopleStatusRepo.save(peopleStatus);
    } catch (error) {
      throw CustomError.internalServer("Internal server error");
    }
  }
  async update(people_status: PeopleStatus): Promise<void> {
    try {
      const dt = new DateTimeService().dateTime;
      const peopleStatusRepo =
        this.entityManager.getRepository(CtlStatusPeople);
      await peopleStatusRepo.update(
        { id: people_status.id?.value },
        {
          name: people_status.name.value,
          description: people_status.description?.value,
          updatedAt: dt.now().toFormat("yyyy-MM-dd HH:mm:ss")
        }
      );
    } catch (error) {
      throw CustomError.internalServer("Internal server error")
    }
  }
  async getOneById(people_status_id: PeopleStatusId): Promise<PeopleStatus | null> {
    try {
      const peopleStatusRepo =
        this.entityManager.getRepository(CtlStatusPeople);

      const peopleStatus = await peopleStatusRepo.findOne({
        where: {
          id: people_status_id.value
        },
        select: {
          id: true,
          name: true,
          description: true,
        }
      });

      if(!peopleStatus){
        return null;
      }

      return this.mapToDomain(peopleStatus);
    } catch (error) {
      throw CustomError.internalServer("Internal server error") 
    }
  }
  async getAll(): Promise<PeopleStatus[]> {
    try {
      const peopleStatusRepo =
        this.entityManager.getRepository(CtlStatusPeople);
      const peopleStatus = await peopleStatusRepo.find();

      this.people_status = peopleStatus.map((item) => {
        return this.mapToDomain(item);
      });

      return this.people_status;

    } catch (error) {
      throw CustomError.internalServer("Internal server error")
    }
  }
  async getOneByName(
    status_name: PeopleStatusName,
    manager: EntityManager = this.entityManager
  ): Promise<PeopleStatusId | null> {
    try {
      const peopleStatusRepo = manager.getRepository(CtlStatusPeople);
      const peopleStatus = await peopleStatusRepo.findOne({
        where: {
          name: status_name.value,
        },
        select: {
          id: true,
          name: true,
          description: true,
        },
      });
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
      new PeopleStatusDescription(peopleStatus?.description ? peopleStatus?.description : null),
      new PeopleStatusId(peopleStatus.id)
    );
  }
}
