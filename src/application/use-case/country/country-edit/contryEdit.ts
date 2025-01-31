import { stat } from "fs";
import {
  Country,
  CountryAbbreviation,
  CountryCode,
  CountryId,
  CountryName,
  CountryRepository,
  CountryState,
} from "../../../../domain";

export class CountryEdit {
  constructor(private respository: CountryRepository) {}

  async run(
    id: number,
    name: string,
    abbreviation: string,
    code: string,
    state: boolean
  ): Promise<void> {
    const country = new Country(
      new CountryName(name),
      new CountryAbbreviation(abbreviation),
      new CountryCode(code),
      new CountryState(state),
      new CountryId(id),
    );

    await this.respository.getOneById(country?.id!);

    return this.respository.update(country);
  }
}
