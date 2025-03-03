import {
  Country,
  CountryAbbreviation,
  CountryCode,
  CountryId,
  CountryName,
  CountryRepository,
  CountryState,
} from "../../../../auth/domain";
import { PostgresCountry } from "../../../../../shared/domain/types";
import { CustomError } from "../../../../../shared/domain/errors/custom.error";
import AppDataSource from "../../../../../shared/infrastructure/db/TypeOrmConfig";
import { CtlCountry } from "../../../../../shared/infrastructure/db/entities/CtlCountry";
import { EntityManager, In, DataSource } from "typeorm";
import DateTimeService from "../../../../../shared/infrastructure/services/date-time/date.time.services";

export class ImplCountryRepository implements CountryRepository {
  private countries: Country[] = [];
  private dt = new DateTimeService().dateTime;
  constructor(private entityManager: EntityManager) {}
  async create(
    country: Country,
    manager: EntityManager = this.entityManager
  ): Promise<void> {
    try {
      const countryRepo = manager.getRepository(CtlCountry);

      const newCountry = await countryRepo.create({
        name: country.name.value,
        abbreviation: country.abbreviation?.value,
        code: country.code?.value,
        state: country.state?.value,
      });
      await countryRepo.save(newCountry);
      
    } catch (error) {
      throw CustomError.internalServer(
        "Internal server error in create country"
      );
    }
  }
  async getAll(): Promise<Country[]> {
    try {
      const countryRepo = this.entityManager.getRepository(CtlCountry);

      const countries = await countryRepo.find({
        select: {
          id: true,
          name: true,
          abbreviation: true,
          code: true,
          state: true,
        },
      });
      this.countries = countries.map((country) => 
        this.mapToDomain({
          id: country.id,
          abbreviation: country.abbreviation ?? null,
          name: country.name,
          code: country.code ?? null,
          state: country.state ?? false
        })
      );

      return this.countries;

    } catch (error) {
      throw CustomError.internalServer(
        "Internal server error in get countries"
      );
    }
  }
  async getOneById(
    id: CountryId,
    manager: EntityManager | DataSource
  ): Promise<Country | null> {
    try {
      if (!manager) {
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
        return null;
      }

      return this.mapToDomain({
        id: country.id,
        name: country.name,
        abbreviation: country.abbreviation ?? null,
        code: country.code ?? null,
        state: country.state ?? null,
      });
    } catch (error) {
      throw CustomError.internalServer("Internal server error");
    }
  }
  async update(country: Country): Promise<void> {
    try {
      const countryRepo = this.entityManager.getRepository(CtlCountry);
      await countryRepo.update(
        { id: country.id?.value },
        {
          name: country.name.value,
          abbreviation: country.abbreviation?.value,
          code: country.code?.value,
          state: country.state?.value,
          updatedAt: this.dt.now(),
        }
      );
    } catch (error) {
      throw CustomError.internalServer(
        "Internal server error in update country"
      );
    }
  }
  async delete(id: CountryId): Promise<void> {
    try {
      const countryRepo = this.entityManager.getTreeRepository(CtlCountry);
      await countryRepo.update({
        id: id.value
      },
      {
        state: false,
        deletedAt: this.dt.now()
      }
    )
    } catch (error) {
      throw CustomError.internalServer("Internal server error")
    }
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
