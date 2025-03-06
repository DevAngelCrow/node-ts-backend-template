import {
  PeopleCountry,
  PeopleCountryRepository,
  PeopleId,
} from "../../../../../../shared/domain/domain-container/DomainContainer";

export class PeopleCountryFindMany {
  constructor(private repository: PeopleCountryRepository) {}

  async run(id_people: number): Promise<PeopleCountry[]> {
    return this.repository.findMany(new PeopleId(id_people));
  }
}
