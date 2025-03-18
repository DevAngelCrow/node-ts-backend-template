import { MaritalStatus } from "../../entities";
import { MaritalStatusId } from "../../value-object";

export interface MaritalStatusRepository {
  create(maritalStatus: MaritalStatus): Promise<void>;
  update(maritalStatus: MaritalStatus): Promise<void>;
  getAll(): Promise<MaritalStatus[]>;
  getOneById(id: MaritalStatusId): Promise<MaritalStatus | null>;
  delete(id: MaritalStatusId): Promise<void>;
}
