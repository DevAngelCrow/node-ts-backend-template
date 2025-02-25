import {
  Country,
  CountryAbbreviation,
  CountryCode,
  CountryId,
  CountryName,
  CountryRepository,
  CountryState,
} from "../../../domain";
import { PostgresCountry } from "../../../../../shared/domain/types";
import { CustomError } from "../../../../../shared/domain/errors/custom.error";
import AppDataSource from "../../../../../shared/infrastructure/db/TypeOrmConfig";
import { CtlCountry } from "../../../../../shared/infrastructure/db/entities/CtlCountry";
import { EntityManager, In, DataSource } from "typeorm";

export class ImplCountryRepository implements CountryRepository {
  private countries: Country[] = [];

  async create(country: Country, manager: EntityManager): Promise<void> {
    try {
      const countryRepo = manager.getRepository(CtlCountry);

      await countryRepo.create({
        name: country.name.value,
        abbreviation: country.abbreviation?.value,
        code: country.code?.value,
        state: country.state?.value,
      });
    } catch (error) {
      throw CustomError.internalServer(
        "Internal server error in create country"
      );
    }
  }
  getAll(): Promise<Country[]> {
    throw new Error("Method not implemented.");
  }
  async getOneById(
    id: CountryId,
    manager: EntityManager | DataSource
  ): Promise<Country | null> {
    try {
      if(!manager){
        manager = AppDataSource.dataSource;
      }
      const countryRepo = manager.getRepository(CtlCountry);

      const country = await countryRepo.findOne({
        where: {
          id: id.value,
        },
        select: {
          id: true,
          name: true,
          abbreviation: true,
          code: true,
          state: true,
        },
      });
      
      if (!country) {
        throw CustomError.notFound("Country not found");
      }

      return this.mapToDomain({
        id: country.id,
        name: country.name,
        abbreviation: country.abbreviation ?? null,
        code: country.code ?? null,
        state: country.state ?? null
      });
    } catch (error) {
      console.log(error)
      throw CustomError.internalServer("Internal server error");
    }
  }
  update(example: Country): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(id: CountryId): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async findMany(
    countries: CountryId[],
    manager: EntityManager
  ): Promise<CountryId[] | null> {
    try {
      const data: number[] = countries.map((id) => +id.value);

      let dataIds: CountryId[] = [];
      const countryRepo = manager.getRepository(CtlCountry);

      const nations = await countryRepo.find({
        where: { id: In(data) },
        select: { id: true },
      });

      const existingCountriesIds = nations.map(
        (country) => new CountryId(+country.id)
      );
      dataIds = existingCountriesIds;

      return dataIds;
    } catch (error) {
      throw CustomError.badRequest(
        "The id to the nationality no exist in the records"
      );
    }
  }

  private mapToDomain(country: PostgresCountry): Country {
    return new Country(
      new CountryName(country.name),
      new CountryAbbreviation(country.abbreviation),
      new CountryCode(country.code),
      new CountryState(country.state),
      new CountryId(country.id)
    );
  }
}
