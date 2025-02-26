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
import { PostgresPeople } from "../../../../../shared/domain/types";
import { CustomError } from "../../../../../shared/domain/errors/custom.error";
import { MntPeople } from "../../../../../shared/infrastructure/db/entities/MntPeople";
import AppDataSource from "../../../../../shared/infrastructure/db/TypeOrmConfig";
import { PeopleCountry } from "../../../../../shared/infrastructure/db/entities/PeopleCountry";
import DateTimeService from "../../../../../shared/infrastructure/services/date-time/date.time.services";
import { EntityManager } from "typeorm";

export class ImplPeopleRepository implements PeopleRepository<EntityManager> {
  private people: People[] = [];
  constructor(private entityManager: EntityManager){}
  
  async createUserWithPerson(people: People, user: User, manager: EntityManager): Promise<void> {
    try {
      if (!people) {
        throw CustomError.internalServer(
          "Internal server error"
        );
      }
      if (!user) {
        throw CustomError.internalServer(
          "Internal server error"
        );
      }
    } catch (error) {
      console.log("error", error)
      throw CustomError.internalServer(`Internal server error`);
    }
  }
  async create(people: People, manager: EntityManager): Promise<People> {
    try {
      let nationalities: { [key: string]: number }[] = [];
      people.nationality.map((nation) => {
        if (nation instanceof CountryId) {
          nationalities.push({ id_country: nation.value });
        }
      });

      const personRepo = manager.getRepository(MntPeople);

      const peopleCountryRepo =
        manager.getRepository(PeopleCountry);

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
      const peopleRepo = this.entityManager.getRepository(MntPeople);

      const people = await peopleRepo.find({
        select: {
          id: true,
          firstName: true,
          middleName: true,
          lastName: true,
          birthdate: true,
          email: true,
          imgPath: true,
          phone: true,
          hasInsurance: true,
        },
        relations: {
          peopleCountries: {
            idCountry: true,
          },
          idGender: true,
          idMaritalStatus: true,
          idStatus: true,
        },
      });

      this.people = people.map((person) =>
        this.mapToDomain({
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
          people_country: person.peopleCountries.map((peopleCountries) => ({
            name: peopleCountries.idCountry.name,
            abbreviation: peopleCountries.idCountry.abbreviation,
            code: peopleCountries.idCountry.code,
            state: peopleCountries.idCountry.state,
            id: peopleCountries.idCountry.id,
          })),
        })
      );

      return this.people;
    } catch (error) {
      throw CustomError.internalServer("Internal server error in get people");
    }
  }
  async findEmailExist(email: PeopleEmail, manager: EntityManager): Promise<boolean> {
    try {
      const peopleRepo = manager.getRepository(MntPeople);

      const emailPeople = await peopleRepo.existsBy({email: email.value})

      if(emailPeople){
        throw CustomError.badRequest("Email already in use")
      }

      return emailPeople;

    } catch (error) {
      throw error
    }
  }
  async getOneById(id: PeopleId, manager: EntityManager = this.entityManager): Promise<People | null> {
    try {
      const peopleRepo = manager.getRepository(MntPeople);

      const person = await peopleRepo.findOne({
        where: {
          id: id.value,
        },
        select: {
          id: true,
          firstName: true,
          middleName: true,
          lastName: true,
          birthdate: true,
          email: true,
          imgPath: true,
          phone: true,
          hasInsurance: true,
        },
        relations: {
          idGender: true,
          idStatus: true,
          idMaritalStatus: true,
          peopleCountries: {
            idCountry: true,
          },
        },
      });

      if (!person) {
        return null;
      }
      return this.mapToDomain({
        id: person.id,
        first_name: person.firstName,
        middle_name: person.middleName,
        last_name: person.lastName,
        birthdate: new Date(person.birthdate),
        ctl_gender: person.idGender,
        email: person.email,
        ctl_marital_status: person.idMaritalStatus,
        img_path: person.imgPath,
        phone: person.phone,
        has_insurance: person.hasInsurance,
        ctl_status_people: person.idStatus,
        people_country: person.peopleCountries.map((nation) => ({
          name: nation.idCountry.name,
          abbreviation: nation.idCountry.abbreviation,
          code: nation.idCountry.code,
          state: nation.idCountry.state,
          id: nation.idCountry.id,
        })),
      });
    } catch (error) {
      throw CustomError.internalServer(
        "Internal server error in get people by id"
      );
    }
  }
  async update(person: People, manager: EntityManager): Promise<void> {
    try {
      const dt = new DateTimeService().dateTime;

      const formatedBirthdate = person.birthdate.value.toISOString();
      const peopleRepo = manager.getRepository(MntPeople);

      const peopleEdit = await peopleRepo.update(
        {
          id: person.getId.value,
        },
        {
          firstName: person.first_name.value,
          middleName: person.middle_name?.value,
          lastName: person.last_name?.value,
          birthdate: dt
            .fromISO(formatedBirthdate)
            .toFormat("yyyy-MM-dd HH:mm:ss"),
          idGender: { id: person.id_gender.value },
          email: person.email.value,
          imgPath: person.img_path?.value,
          idMaritalStatus: { id: person.id_marital_status.value },
          phone: person.phone.value,
          hasInsurance: person.has_insurance?.value,
          idStatus: { id: person.id_status.value },
          updatedAt: dt.now().toFormat("yyyy-MM-dd HH:mm:ss"),
        }
      );
    } catch (error) {
      throw CustomError.internalServer(
        "Internal server error in update person"
      );
    }
  }
  async delete(id: PeopleId, id_status: PeopleStatusId, manager: EntityManager): Promise<void> {
    try {
      const peopleRepo = manager.getRepository(MntPeople);

      await peopleRepo.update(
        {
          id: id.value,
        },
        {
          idStatus: {
            id: id_status.value,
          },
        }
      );
    } catch (error) {
      throw CustomError.internalServer(
        "Internal server error in delete person"
      );
    }
  }
  async findByEmail(email: PeopleEmail, manager: EntityManager = this.entityManager): Promise<People | null> {
    try {
      const peopleRepo = manager.getRepository(MntPeople);

      const person = await peopleRepo.findOne({
        where: {
          email: email.value,
        },
        select: {
          id: true,
          firstName: true,
          middleName: true,
          lastName: true,
          birthdate: true,
          email: true,
          imgPath: true,
          phone: true,
          hasInsurance: true,
        },
        relations: {
          idGender: true,
          idMaritalStatus: true,
          idStatus: true,
          peopleCountries: {
            idCountry: true,
          },
        },
      });

      if (!person) {
        return null;
      }

      return this.mapToDomain({
        id: person.id,
        first_name: person.firstName,
        middle_name: person.middleName,
        last_name: person.lastName,
        birthdate: new Date(person.birthdate),
        ctl_gender: person.idGender,
        email: person.email,
        ctl_marital_status: person.idMaritalStatus,
        img_path: person.imgPath,
        phone: person.phone,
        has_insurance: person.hasInsurance,
        ctl_status_people: person.idStatus,
        people_country: person.peopleCountries.map((nation) => ({
          name: nation.idCountry.name,
          abbreviation: nation.idCountry.abbreviation,
          code: nation.idCountry.code,
          state: nation.idCountry.state,
          id: nation.idCountry.id,
        })),
      });
    } catch (error) {
      throw CustomError.internalServer(
        "Internal server error in find by email"
      );
    }
  }
  private mapToDomain(people: PostgresPeople): People {
    const nationalities = people.people_country.map(
      (pc) =>
        new Country(
          new CountryName(pc.name),
          new CountryAbbreviation(pc.abbreviation),
          new CountryCode(pc.code),
          new CountryState(pc.state),
          new CountryId(pc.id)
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
