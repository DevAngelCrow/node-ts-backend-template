import { Country } from "../../entities";
import { CountryId } from "../../value-object";

export interface CountryRepository {
  create(country: Country): Promise<void>;
  getAll(): Promise<Country[]>;
  getOneById(id: CountryId): Promise<Country | null>;
  update(country: Country): Promise<void>;
  delete(id: CountryId): Promise<void>;
  findMany(countries: CountryId[]) : Promise<CountryId[] | null>
}
