import { EntityManager } from "typeorm";
import { Gender, GenderId, GenderRepository } from "../../../domain";
import { CtlGender } from "../../../../../shared/infrastructure/db/entities/CtlGender";
import { CustomError } from "../../../../../shared/domain/errors/custom.error";

export class ImplGenderRepository implements GenderRepository {
  constructor(private entityManager: EntityManager) {}
  async create(address: Gender): Promise<void> {
    try {
      const genderRepo = this.entityManager.getRepository(CtlGender);
      const gender = genderRepo.create(
        {
            name: address.name.value
        }
      );
      await genderRepo.save(gender);
    } catch (error) {
        throw CustomError.internalServer("Internal server error")
    }
  }
  update(address: Gender): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getAll(): Promise<Gender[]> {
    throw new Error("Method not implemented.");
  }
  getOneById(id: GenderId): Promise<Gender | null> {
    throw new Error("Method not implemented.");
  }
  delete(id: GenderId): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
