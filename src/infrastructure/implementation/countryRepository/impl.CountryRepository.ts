import { Country, CountryAbbreviation, CountryCode, CountryId, CountryName, CountryRepository, CountryState, CustomError, PostgresCountry } from "../../../domain";
import { prismaClient } from "../../db/PrismaWrapper";
import { mapperToPrismaData } from "./mapperToPrismaData";

export class ImplCountryRepository implements CountryRepository{
    private countries : Country[] = [];
    private prisma = prismaClient;
    async create(country: Country): Promise<void> {
        try {
            const prismaData = new mapperToPrismaData().mntPeopleToPrismaCreate(country);
            this.prisma.ctl_country.create({
                data: prismaData,
            });
        } catch (error) {
            throw CustomError.internalServer("Internal server error")
        }
    }
    getAll(): Promise<Country[]> {
        throw new Error("Method not implemented.");
    }
    async getOneById(id: CountryId): Promise<Country | null> {
        try {
            const country = this.prisma.ctl_country.findUnique({
                where: {
                    id: id.value,
                },
                select: {
                    name: true,
                    abbreviation: true,
                    code: true,
                    state: true
                }
            });
            if(!country){
                return null;
            }

            return this.mapToDomain(country);

        } catch (error) {
            throw CustomError.internalServer("Internal server error")
        }
    }
    update(example: Country): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(id: CountryId): Promise<void> {
        throw new Error("Method not implemented.");
    } 

    private mapToDomain(country: PostgresCountry) : Country{
        return new Country(
            new CountryName(country.name),
            new CountryAbbreviation(country.abbreviation),
            new CountryCode(country.code),
            new CountryState(country.state),
            new CountryId(country.id)
        );
    }

}