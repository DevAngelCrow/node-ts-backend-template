import { Municipality } from "../../entities";
import { MunicipalityId } from "../../value-object";

export interface MunicipalityRepository<T> {
    create(municipality: Municipality, transactionClient?: T): Promise<void>;
    getAll(): Promise<Municipality[]>;
    getOneById(id: MunicipalityId, transactionClient?: T): Promise<Municipality | null>;
    update(municipality: Municipality, transactionClient?: T): Promise<void>;
    delete(id: MunicipalityId, transactionClient?: T): Promise<void>;
    findMany(municipalities: MunicipalityId[], transactionClient?: T) : Promise<MunicipalityId[] | null>
}