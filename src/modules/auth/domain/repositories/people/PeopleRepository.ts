import { People } from "../../entities";
import { CountryId, PeopleEmail, PeopleId, PeopleStatusId, PeopleStatusName } from "../../value-object";

export interface PeopleRepository {
  create(example: People): Promise<void>;
  getAll(): Promise<People[]>;
  getOneById(id: PeopleId): Promise<People | null>;
  update(example: People): Promise<void>;
  delete(id: PeopleId, id_status: PeopleStatusId): Promise<void>;
  updatePeopleCountry(id: PeopleId, countries: CountryId[]) : Promise<void>;
  deletePeopleCoutry(id: PeopleId, countries: CountryId[]) : Promise<void>;
  findByEmail(email: PeopleEmail) : Promise<People | null>;
}
