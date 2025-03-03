import {
  CountryId,
  PeopleCountryId,
  PeopleCountryIdCountry,
  PeopleCountryIdPeople,
  PeopleCountryRepository,
  PeopleCountryStatus,
  PeopleId,
} from "../../../../auth/domain";
import AppDataSource from "../../../../../shared/infrastructure/db/TypeOrmConfig";
import { PeopleCountry as PeopleCountryEntity } from "../../../../../shared/infrastructure/db/entities/PeopleCountry";
import { CtlCountry } from "../../../../../shared/infrastructure/db/entities/CtlCountry";
import { MntPeople } from "../../../../../shared/infrastructure/db/entities/MntPeople";
import { CustomError } from "../../../../../shared/domain/errors/custom.error";
import { PeopleCountry as PeopleCountryDomain } from "../../../domain/entities/people-country/People.country.entity";
import { EntityManager, In, Not } from "typeorm";
export class ImplPeopleCountryRepository implements PeopleCountryRepository<EntityManager>{
  constructor(private entityManager: EntityManager){}
  async findMany(id_people: PeopleId, manager: EntityManager): Promise<PeopleCountryDomain[]> {
    try {
      const peopleCountryRepo =
      manager.getRepository(PeopleCountryEntity);

    const peopleCoutries = await peopleCountryRepo.find({
      where: {
        idPeople: {
          id: id_people.value,
        },
      },
      select: {
        id: true,
        state: true,
      },
      relations: {
        idCountry: true,
        idPeople: true,
      },
    });

    const peopleCountriesFormated = peopleCoutries.map(
      (personCountry) =>
        new PeopleCountryDomain(
          new PeopleCountryIdPeople(personCountry.idPeople.id),
          new PeopleCountryIdCountry(personCountry.idCountry.id),
          new PeopleCountryStatus(personCountry.state ?? false),
          new PeopleCountryId(personCountry.id)
        )
    );

    if (!peopleCountriesFormated.length) {
      return [];
    }

    return peopleCountriesFormated; 
    } catch (error) {
      throw CustomError.internalServer("Internal server error in findManyPeople")
    }
  }
  async create(id_people: PeopleId, id_countries: CountryId[], manager: EntityManager): Promise<void> {
    try {
      const peopleCountryRepo =
        manager.getRepository(PeopleCountryEntity);

      const peopleCountries = id_countries.map((nationality) =>
        peopleCountryRepo.create({
          idCountry: { id: nationality.value } as CtlCountry,
          idPeople: { id: id_people.value } as MntPeople,
          state: true,
        })
      );

      await peopleCountryRepo.save(peopleCountries);
    } catch (error) {
      throw CustomError.internalServer(
        "Internal server error in peopleCountryCreate"
      );
    }
  }
  async update(id_people: PeopleId, id_countries: CountryId[], manager: EntityManager): Promise<void> {
    try {
      const peopleCountryRepo =
        manager.getRepository(PeopleCountryEntity);
      const peopleCountryDB = await this.findMany(id_people, manager);
      const nationalities = id_countries.map((nation) => +nation.value);

      const existingIds = new Set(
        peopleCountryDB.map((person) => +person.id_country.value)
      );

      const countriesToInactivate = peopleCountryDB.filter(
        (person) => !nationalities.includes(+person.id_country.value)
      );

      const countriesToReactivate = peopleCountryDB.filter(
        (person) =>
          nationalities.includes(+person.id_country.value) &&
          person.state.value === false
      );

      const newCountries = nationalities.filter(
        (nation) => !existingIds.has(+nation)
      );

      if (countriesToInactivate.length) {
        const idCountries = countriesToInactivate.map(
          (nation) => nation.id_country.value
        );
        await peopleCountryRepo.update(
          {
            idPeople: { id: id_people.value },
            idCountry: In(idCountries),
          },
          {
            state: false,
            updateAt: new Date(Date.now()),
          }
        );
      }

      if (countriesToReactivate.length) {
        const idCountries = countriesToReactivate.map(
          (nation) => nation.id_country.value
        );

        await peopleCountryRepo.update(
          {
            idPeople: { id: id_people.value },
            idCountry: In(idCountries),
          },
          {
            state: true,
            updateAt: new Date(Date.now()),
          }
        );
      }

      if (newCountries.length) {
        const peopleCountriesCreate = newCountries.map((nationality) =>
          peopleCountryRepo.create({
            idCountry: { id: nationality } as CtlCountry,
            idPeople: { id: id_people.value } as MntPeople,
            state: true,
          })
        );

        await peopleCountryRepo.save(peopleCountriesCreate);
      }

      if(!id_countries.length){
        await peopleCountryRepo.update(
          {
            idPeople: { id: id_people.value },
          },
          {
            state: false,
            updateAt: new Date(Date.now()),
          }
        );
      }

    } catch (error) {
      throw CustomError.internalServer("Error in update peopleCountry.");
    }
  }
}
