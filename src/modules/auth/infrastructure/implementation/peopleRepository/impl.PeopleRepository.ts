import {
  Country,
  CountryAbbreviation,
  CountryCode,
  CountryId,
  CountryName,
  CountryState,
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
  User,
} from "../../../domain";
import { prismaClient } from "../../../../../shared/infrastructure/db/PrismaWrapper";
import { PostgresPeople } from "../../../../../shared/domain/types";
import { CustomError } from "../../../../../shared/domain/errors/custom.error";
import { MntPeople } from "../../../../../shared/infrastructure/db/entities/MntPeople";
import AppDataSource from "../../../../../shared/infrastructure/db/TypeOrmConfig";
import { CtlGender } from "../../../../../shared/infrastructure/db/entities/CtlGender";
import { CtlMaritalStatus } from "../../../../../shared/infrastructure/db/entities/CtlMaritalStatus";
import { CtlStatusPeople } from "../../../../../shared/infrastructure/db/entities/CtlStatusPeople";
import { PeopleCountry } from "../../../../../shared/infrastructure/db/entities/PeopleCountry";
import { CtlCountry } from "../../../../../shared/infrastructure/db/entities/CtlCountry";

export class ImplPeopleRepository implements PeopleRepository {
  async createUserWithPerson(people: People, user: User): Promise<void> {
    try {
      if (!people) {
        throw CustomError.internalServer(
          "No se hizo el registro correctamente"
        );
      }
      if (!user) {
        throw CustomError.internalServer(
          "No se hizo el registro correctamente"
        );
      }
      this.getOneById(people.getId);
    } catch (error) {
      throw CustomError.badRequest(`El error ${error}`);
    }
  }

  private people: People[] = [];
  private prisma = prismaClient;

  async create(people: People): Promise<People> {
    try {
      let nationalities: { [key: string]: number }[] = [];
      people.nationality.map((nation) => {
        if (nation instanceof CountryId) {
          nationalities.push({ id_country: nation.value });
        }
      });

      const personRepo = AppDataSource.dataSource.getRepository(MntPeople);

      const peopleCountryRepo =
        AppDataSource.dataSource.getRepository(PeopleCountry);

      const newPerson = await personRepo.create({
        firstName: people.first_name.value,
        middleName: people.middle_name?.value,
        lastName: people.last_name?.value,
        birthdate: people.birthdate.value.toString(),
        email: people.email.value,
        imgPath: people.img_path?.value,
        phone: people.phone.value,
        hasInsurance: people.has_insurance?.value,
        idGender: { id: people.id_gender.value },
        idStatus: { id: people.id_status.value },
        idMaritalStatus: { id: people.id_marital_status.value },
      });

      const savedPerson = await personRepo.save(newPerson);



      const peopleCountries = nationalities.map((nationality) =>
        peopleCountryRepo.create({
          idCountry: { id: nationality.id_country } as CtlCountry,
          idPeople: { id: savedPerson.id } as MntPeople,
          state: true,
        })
      );

      await peopleCountryRepo.save(peopleCountries);
      
      people.setId = new PeopleId(savedPerson.id!);

      return people;

    } catch (error) {
      throw CustomError.internalServer(
        "Internal server error in create people"
      );
    }
  }
  async getAll(): Promise<People[]> {
    try {

      const peopleRepo = AppDataSource.dataSource.getRepository(MntPeople);

      const people = await peopleRepo.find({
        select: {
          id: true,
          firstName: true,
          middleName: true,
          lastName: true,
          birthdate: true,
          idGender: {
            id: true,
          },
          email: true,
          idMaritalStatus: {
            id: true,
          },
          imgPath: true,
          phone: true,
          hasInsurance: true,
          idStatus: {
            id: true,
          },
          peopleCountries: true
        }
      });
      

      console.log(people, 'esto regresa typeORM')
      this.people = people.map((person) => this.mapToDomain({
        id: person.id,
        first_name: person.firstName,
        middle_name: person?.middleName,
        last_name: person.lastName,
        birthdate: new Date(person.birthdate),
        ctl_gender: person.idGender,
        email: person.email, 
        ctl_marital_status: person.idMaritalStatus, 
        img_path: person?.imgPath,
        phone: person.phone,
        has_insurance: person.hasInsurance,
        ctl_status_people: person.idStatus,
        people_country: person.peopleCountries, 
      }));

      return this.people;
    } catch (error) {
      console.log(error, 'error')
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
    // try {
    //   const personEdit = new mapperToPrismaData().mntPeopleToPrismaUpdate(
    //     person
    //   );
    //   const id = person.getId.value;
    //   await this.prisma.mnt_people.update({
    //     where: {
    //       id: id,
    //     },
    //     data: personEdit,
    //   });
    // } catch (error) {
    //   throw CustomError.internalServer(
    //     "Internal server error in update person"
    //   );
    // }
  }
  async delete(id: PeopleId, id_status: PeopleStatusId): Promise<void> {
    try {
      await this.prisma.mnt_people.update({
        where: {
          id: id.value,
        },
        data: {
          id_status: id_status.value,
        },
      });
      //throw new Error("Method not implemented.");
    } catch (error) {
      throw CustomError.internalServer(
        "Internal server error in delete person"
      );
    }
  }
  async updatePeopleCountry(
    id: PeopleId,
    countries: CountryId[]
  ): Promise<void> {
    try {
      const nationalities = countries.map((nation) => +nation.value);
      const people_country = await this.prisma.people_country.findMany({
        where: {
          id_people: id.value,
        },
        select: {
          id: true,
          id_country: true,
          id_people: true,
          state: true,
        },
      });

      const existingIds = new Set(
        people_country.map((person) => +person.id_country)
      );
      const countriesToInactivate = people_country.filter(
        (person) => !nationalities.includes(+person.id_country)
      );
      const countriesToReactivate = people_country.filter(
        (person) =>
          nationalities.includes(+person.id_country) && person.state === false
      );
      const newCountries = nationalities.filter(
        (nation) => !existingIds.has(+nation)
      );

      if (countriesToInactivate.length) {
        await this.prisma.people_country.updateMany({
          where: {
            id_people: id.value,
            id_country: {
              in: countriesToInactivate.map((nation) => nation.id_country),
            },
          },
          data: {
            state: false,
            update_at: new Date(Date.now()),
          },
        });
      }

      if (countriesToReactivate.length) {
        await this.prisma.people_country.updateMany({
          where: {
            id_people: id.value,
            id_country: {
              in: countriesToReactivate.map((nation) => nation.id_country),
            },
          },
          data: { state: true, update_at: new Date(Date.now()) },
        });
      }

      if (newCountries.length) {
        await this.prisma.people_country.createMany({
          data: newCountries.map((nation) => ({
            id_people: id.value,
            id_country: +nation,
            state: true,
          })),
        });
      }
    } catch (error) {
      throw CustomError.internalServer("Internal server error");
    }
  }
  async findByEmail(email: PeopleEmail): Promise<People | null> {
    try {
      const person = await this.prisma.mnt_people.findFirst({
        where: {
          email: email.value,
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
        throw CustomError.notFound("Email not found");
      }

      return this.mapToDomain(person);
    } catch (error) {
      console.log(error, "error en find email people");
      throw CustomError.internalServer(
        "Internal server error in find by email"
      );
    }
  }

  deletePeopleCoutry(id: PeopleId, countries: CountryId[]): Promise<void> {
    throw new Error("Method not implemented.");
  }
  private mapToDomain(people: PostgresPeople): People {
    console.log(people.people_country, 'people_country')
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
