import {
  Country,
  CountryAbbreviation,
  CountryCode,
  CountryId,
  CountryName,
  CountryRepository,
  CountryState,
  CustomError,
  PostgresCountry,
} from "../../../domain";
///import PostgresCountry from "../../../domain/types/postgres-types/postgresCountry";
import { prismaClient } from "../../db/PrismaWrapper";
import { mapperToPrismaData } from "./mapperToPrismaData";

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
      throw CustomError.internalServer("Internal server error");
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
        return null;
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
      
      let dataIds : CountryId[] = []; 
      
        const existingCountries = await this.prisma.ctl_country.findMany({
          where: { id: { in: data } },
          select: { id: true },
        });
        const existingCountriesIds = existingCountries.map((country) => new CountryId(+country.id));
        dataIds = existingCountriesIds
        
      
      return dataIds;
    } catch (error) {
      //console.log(error, 'error')
      throw error;
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
