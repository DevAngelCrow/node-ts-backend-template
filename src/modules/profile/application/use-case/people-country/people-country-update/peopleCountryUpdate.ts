import {
  CountryId,
  CountryRepository,
  PeopleCountryRepository,
  PeopleId,
} from "../../../../../../shared/domain/domain-container/DomainContainer";

export class PeopleCountryUpdate {
  constructor(
    private repository: PeopleCountryRepository,
    private repositoryCountry: CountryRepository
  ) {}

  async run(id_people: number, id_countries: number[]): Promise<void> {
    const countryId = id_countries.map((idCountry) => new CountryId(idCountry));

    await this.repositoryCountry.findMany(countryId);

    return this.repository.update(new PeopleId(id_people), countryId);
  }
}
