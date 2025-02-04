import { People } from "../../entities";
import { CountryId, PeopleId } from "../../value-object";

export interface PeopleRepository {
  create(example: People): Promise<void>;
  getAll(): Promise<People[]>;
  getOneById(id: PeopleId): Promise<People | null>;
  update(example: People): Promise<void>;
  delete(id: PeopleId): Promise<void>;
  updatePeopleCountry(id: PeopleId, countries: CountryId[]) : Promise<void>;
  deletePeopleCoutry(id: PeopleId, countries: CountryId[]) : Promise<void>
}
