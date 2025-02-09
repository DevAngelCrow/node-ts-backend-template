import {
  Country,
  CountryAbbreviation,
  CountryCode,
  CountryId,
  CountryName,
  CountryRepository,
  CountryState,
} from "../../../domain";
import { prismaClient } from "../../../../../shared/infraestructure/db/PrismaWrapper";
import { mapperToPrismaData } from "./mapperToPrismaData";
import { PostgresCountry } from "../../../../../shared/domain/types";
import { CustomError } from "../../../../../shared/domain/errors/custom.error";

export class ImplCountryRepository implements CountryRepository {
  private countries: Country[] = [];
  private prisma = prismaClient;
  async create(country: Country): Promise<void> {
    try {
      const prismaData = new mapperToPrismaData().mntPeopleToPrismaCreate(
        country
      );
      await this.prisma.ctl_country.create({
        data: prismaData,
      });
    } catch (error) {
      throw CustomError.internalServer("Internal server error in create country");
    }
  }
  getAll(): Promise<Country[]> {
    throw new Error("Method not implemented.");
  }
  async getOneById(id: CountryId): Promise<Country | null> {
    try {
      const country = await this.prisma.ctl_country.findUnique({
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

      return this.mapToDomain(country);
    } catch (error) {
      throw CustomError.internalServer("Internal server error");
    }
  }
  update(example: Country): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(id: CountryId): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async findMany(countries: CountryId[]): Promise<CountryId[] | null> {
    try {
      const data: number[] = countries.map((id) => +id.value);

      let dataIds: CountryId[] = [];

      const existingCountries = await this.prisma.ctl_country.findMany({
        where: { id: { in: data } },
        select: { id: true },
      });
      const existingCountriesIds = existingCountries.map((country) => new CountryId(+country.id));
      dataIds = existingCountriesIds

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
