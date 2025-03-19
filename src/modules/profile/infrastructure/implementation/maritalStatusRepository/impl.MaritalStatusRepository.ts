import { EntityManager } from "typeorm";
import {
  MaritalStatus,
  MaritalStatusId,
  MaritalStatusName,
  MaritalStatusRepository,
} from "../../../domain";
import { CtlMaritalStatus } from "../../../../../shared/infrastructure/db/entities/CtlMaritalStatus";
import { CustomError } from "../../../../../shared/domain/errors/custom.error";
import DateTimeService from "../../../../../shared/infrastructure/services/date-time/date.time.services";
import { PostgresMaritalStatus } from "../../../../../shared/domain/types";

export class ImplMaritalStatusRepository implements MaritalStatusRepository {
  private maritalStatus: MaritalStatus[] = [];
  constructor(private entityManager: EntityManager) {}
  async create(maritalStatus: MaritalStatus): Promise<void> {
    try {
      const maritalStatusRepo =
        this.entityManager.getRepository(CtlMaritalStatus);
      const newMaritalStatus = await maritalStatusRepo.create({
        name: maritalStatus.name.value,
      });
      await maritalStatusRepo.save(newMaritalStatus);
    } catch (error) {
      throw CustomError.internalServer("Internal server error");
    }
  }
  async update(maritalStatus: MaritalStatus): Promise<void> {
    try {
      const dt = new DateTimeService().dateTime;
      const maritalStatusRepo =
        this.entityManager.getRepository(CtlMaritalStatus);
      await maritalStatusRepo.update(
        { id: maritalStatus.id?.value },
        {
          name: maritalStatus.name.value,
          updateAt: dt.now().toFormat("yyyy-MM-dd HH:mm:ss"),
        }
      );
    } catch (error) {
      throw CustomError.internalServer("Internal server error");
    }
  }
  async getAll(): Promise<MaritalStatus[]> {
    try {
      const maritalStatusRepo =
        this.entityManager.getRepository(CtlMaritalStatus);
      const maritalStatusDB = await maritalStatusRepo.find({
        select: {
          id: true,
          name: true,
        },
      });

      this.maritalStatus = maritalStatusDB.map((item) => {
        return this.mapToDomain(item);
      });

      return this.maritalStatus;
    } catch (error) {
      throw CustomError.internalServer("Internal server error");
    }
  }
  async getOneById(id: MaritalStatusId): Promise<MaritalStatus | null> {
    try {
      const maritalStatusRepo =
        this.entityManager.getRepository(CtlMaritalStatus);
      const maritalStatus = await maritalStatusRepo.findOne({
        where: {
          id: id.value,
        },
        select: {
            id: true,
            name: true
        }
      });

      if(!maritalStatus){
        return null;
      }

      return this.mapToDomain(maritalStatus);

    } catch (error) {}
    throw new Error("Method not implemented.");
  }
  delete(id: MaritalStatusId): Promise<void> {
    throw new Error("Method not implemented.");
  }
  private mapToDomain(maritalStatus: PostgresMaritalStatus) {
    return new MaritalStatus(
      new MaritalStatusName(maritalStatus.name),
      new MaritalStatusId(maritalStatus.id)
    );
  }
}
