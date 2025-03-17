import { EntityManager } from "typeorm";
import {
  Gender,
  GenderId,
  GenderName,
  GenderRepository,
} from "../../../domain";
import { CtlGender } from "../../../../../shared/infrastructure/db/entities/CtlGender";
import { CustomError } from "../../../../../shared/domain/errors/custom.error";
import DateTimeService from "../../../../../shared/infrastructure/services/date-time/date.time.services";
import { PostgresGender } from "../../../../../shared/domain/types";
export class ImplGenderRepository implements GenderRepository {
  private gender: Gender[] = [];
  constructor(private entityManager: EntityManager) {}
  async create(gender: Gender): Promise<void> {
    try {
      const genderRepo = this.entityManager.getRepository(CtlGender);
      const newGender = genderRepo.create({
        name: gender.name.value,
      });
      await genderRepo.save(newGender);
    } catch (error) {
      throw CustomError.internalServer("Internal server error");
    }
  }
  async update(gender: Gender): Promise<void> {
    try {
      const dt = new DateTimeService().dateTime;
      const genderRepo = this.entityManager.getRepository(CtlGender);
      await genderRepo.update(
        { id: gender.id?.value },
        {
          name: gender.name.value,
          updatedAt: dt.now().toFormat("yyyy-MM-dd HH:mm:ss"),
        }
      );
    } catch (error) {
      throw CustomError.internalServer("Internal server error");
    }
  }
  async getAll(): Promise<Gender[]> {
    try {
      const genderRepo = this.entityManager.getRepository(CtlGender);
      const genders = await genderRepo.find();

      this.gender = genders.map((gender) => {
        return this.mapToDomain(gender);
      });

      return this.gender;
    } catch (error) {
      throw CustomError.internalServer("Internal server error");
    }
  }
  async getOneById(id: GenderId): Promise<Gender | null> {
    try {
      const genderRepo = this.entityManager.getRepository(CtlGender);
      const gender = await genderRepo.findOne({
        where: { id: id.value },
        select: { id: true, name: true },
      });

      if(!gender){
        return null;
      }

      return this.mapToDomain(gender);

    } catch (error) {
      throw CustomError.internalServer("Internal server error")
    }
  }
  async delete(id: GenderId): Promise<void> {
    try {
      const genderRepo = this.entityManager.getRepository(CtlGender);
      await genderRepo.update(
        {id: id.value},
        {}
      );
    } catch (error) {
      
    }
  }

  private mapToDomain(gender: PostgresGender) {
    return new Gender(new GenderName(gender.name), new GenderId(gender.id));
  }
}
