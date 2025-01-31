import { Prisma } from "@prisma/client";
import { Country } from "../../../domain";

export class mapperToPrismaData {
    mntPeopleToPrismaCreate(country: Country): Prisma.ctl_countryCreateInput {
        return {
            name: country.name.value,
            abbreviation: country.abbreviation.value,
            code: country.code.value,
            state: country.state.value,
        }
    }
    mntPeopleToPrismaUpdate(people: Country): Prisma.ctl_countryUpdateInput {
        throw 'test'
    }
}