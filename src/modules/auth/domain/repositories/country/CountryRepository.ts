import { Country } from "../../entities";
import { CountryId } from "../../value-object";

export interface CountryRepository<T = unknown>{
  create(country: Country, transactionClient?: T): Promise<void>;
  getAll(): Promise<Country[]>;
  getOneById(id: CountryId, transactionClient?: T): Promise<Country | null>;
  update(country: Country, transactionClient?: T): Promise<void>;
  delete(id: CountryId, transactionClient?: T): Promise<void>;
  findMany(countries: CountryId[], transactionClient?: T) : Promise<CountryId[] | null>
}
