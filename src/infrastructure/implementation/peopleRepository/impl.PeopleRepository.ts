import {
  Country,
  CountryAbbreviation,
  CountryCode,
  CountryId,
  CountryName,
  CountryState,
  CustomError,
  Gender,
  GenderId,
  GenderName,
  MaritalStatus,
  MaritalStatusId,
  MaritalStatusName,
  People,
  PeopleBirthdate,
  PeopleEmail,
  PeopleFirstName,
  PeopleHasInsurance,
  PeopleId,
  PeopleIdGender,
  PeopleIdMaritalStatus,
  PeopleIdStatus,
  PeopleImgPath,
  PeopleLastName,
  PeopleMiddleName,
  PeoplePhone,
  PeopleRepository,
  PeopleStatus,
  PeopleStatusDescription,
  PeopleStatusId,
  PeopleStatusName,
} from "../../../domain";
import {
  prismaClient,
  PrismaClientKnownRequestError,
} from "../../db/PrismaWrapper";
import { PostgresPeople } from "../../../domain";
import { mapperToPrismaData } from "./mapperToPrismaData";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";

export class ImplPeopleRepository implements PeopleRepository {
  private people: People[] = [];
  private prisma = prismaClient;

  async create(people: People): Promise<void> {
    try {
      const peoplePrismaData = new mapperToPrismaData().mntPeopleToPrismaCreate(
        people
      );

      await this.prisma.mnt_people.create({
        data: peoplePrismaData,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        //console.log(error);
      }
      if (error instanceof PrismaClientUnknownRequestError) {
        //console.log(error.constructor.name);
      }

      throw CustomError.internalServer(
        "Internal server error in create people"
      );
    }
  }
  async getAll(): Promise<People[]> {
    try {
      const people = await this.prisma.mnt_people.findMany({
        select: {
          ctl_gender: true,
          ctl_marital_status: true,
          ctl_status_people: true,
          id: true,
          first_name: true,
          middle_name: true,
          last_name: true,
          birthdate: true,
          email: true,
          img_path: true,
          phone: true,
          has_insurance: true,
          people_country: {
            select: {
              ctl_country: {
                select: {
                  id: true,
                  name: true,
                  code: true,
                  abbreviation: true,
                  state: true,
                },
              },
            },
          },
        },
        orderBy: {
          id: "asc",
        },
      });

      this.people = people.map((person) => this.mapToDomain(person));

      return this.people;
    } catch (error) {
      throw CustomError.internalServer("Internal server error in get people");
    }
  }
  async getOneById(id: PeopleId): Promise<People | null> {
    try {
      const person = await this.prisma.mnt_people.findUnique({
        where: {
          id: id.value,
        },
        select: {
          ctl_gender: true,
          ctl_marital_status: true,
          ctl_status_people: true,
          id: true,
          first_name: true,
          middle_name: true,
          last_name: true,
          birthdate: true,
          email: true,
          img_path: true,
          phone: true,
          has_insurance: true,
          people_country: {
            select: {
              ctl_country: {
                select: {
                  id: true,
                  name: true,
                  code: true,
                  abbreviation: true,
                  state: true,
                },
              },
            },
          },
        },
      });

      if (!person) {
        return null;
      }
      return this.mapToDomain(person);
    } catch (error) {
      throw CustomError.internalServer(
        "Internal server error in get people by id"
      );
    }
  }
  async update(person: People): Promise<void> {
    try {
      const personDb = new mapperToPrismaData().mntPeopleToPrismaUpdate(person);
    } catch (error) {}
  }
  delete(id: PeopleId): Promise<void> {
    try {
      throw new Error("Method not implemented.");
    } catch (error) {
      throw CustomError.internalServer(
        "Internal server error in delete person"
      );
    }
  }
  async updatePeopleCountry(id: PeopleId, countries: CountryId[]): Promise<void> {
    try {
        const nationalities = countries.map((nation) => nation.value);
        const people_country = await this.prisma.people_country.findMany({
            where: {
                id: id.value,
            },
            select: {
                id: true,
                id_country: true,
                id_people: true,
                state: true,
            }
        });

        const existingIds = new Set(people_country.map((persona) => persona.id_country));
        const countriesToInactivate = people_country.filter((persona) => !nationalities.includes(persona.id_country));
        const countriesToReactivate = people_country.filter((persona) => nationalities.includes(persona.id_country) && persona.state === false);
        const newCountries = nationalities.filter((nation) => !existingIds.has(nation));
        

        if(countriesToInactivate.length){
            await this.prisma.people_country.updateMany({
                where: {
                    id_people: id.value,
                    id_country: { in: countriesToInactivate.map((nation) => nation.id_country) },
                },
                data: {
                    state: false,
                    update_at: new Date(Date.now()),
                }
            });
        }

        if(countriesToReactivate.length){
            await this.prisma.people_country.updateMany({
                where:{
                    id_people: id.value,
                    id_country: { in: countriesToReactivate.map((nation) => nation.id_country)}
                },
                data: { state: true, update_at: new Date(Date.now())},
            });
        }

        if(newCountries.length){  
            await this.prisma.people_country.createMany({
                data: newCountries.map((nation) => ({id_people: id.value, id_country: nation, state: true })),
            })
        }
        // await this.prisma.people_country.updateMany({
        //     where: {
        //         id_people: id.value,
        //         id_country: {
        //             in: countries.map((nation) => (nation.value))
        //         },
        //         state: {
        //              equals: false,
        //         }
        //     },
        //     data: {
        //         state: true,
        //         update_at: new Date(Date.now())
        //     }
        // });

        // await this.prisma.people_country.updateMany({
        //     where: {
        //         id_people: id.value,
        //         id_country: {
        //             not: countries.map((nation) => (nation.value))
        //         }
        //     }
        // });
    } catch (error) {
        console.log(error)
    }
    throw new Error("Method not implemented.");
  }
  deletePeopleCoutry(id: PeopleId, countries: CountryId[]): Promise<void> {
    throw new Error("Method not implemented.");
  }
  private mapToDomain(people: PostgresPeople): People {
    const nationalities = people.people_country.map(
      (pc) =>
        new Country(
          new CountryName(pc.ctl_country.name),
          new CountryAbbreviation(pc.ctl_country.abbreviation),
          new CountryCode(pc.ctl_country.code),
          new CountryState(pc.ctl_country.state),
          new CountryId(pc.ctl_country.id)
        )
    );

    return new People(
      new PeopleFirstName(people.first_name),
      new PeopleBirthdate(people.birthdate),
      new PeopleIdGender(people.ctl_gender.id),
      new PeopleEmail(people.email),
      new PeopleIdMaritalStatus(people.ctl_marital_status.id),
      new PeoplePhone(people.phone),
      new PeopleIdStatus(people.ctl_status_people.id),
      nationalities,
      new PeopleMiddleName(people.middle_name!),
      new PeopleLastName(people.last_name!),
      new PeopleImgPath(people.img_path!),
      new PeopleHasInsurance(people.has_insurance!),
      new Gender(
        new GenderName(people.ctl_gender.name),
        new GenderId(people.ctl_gender.id)
      ),
      new MaritalStatus(
        new MaritalStatusName(people.ctl_marital_status.name),
        new MaritalStatusId(+people.ctl_marital_status.id)
      ),
      new PeopleStatus(
        new PeopleStatusName(people?.ctl_status_people?.name),
        new PeopleStatusDescription(people.ctl_status_people.description),
        new PeopleStatusId(+people.ctl_status_people.id)
      ),
      new PeopleId(+people.id)
    );
  }
}
