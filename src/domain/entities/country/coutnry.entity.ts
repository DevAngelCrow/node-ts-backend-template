import { CountryAbbreviation, CountryCode, CountryId, CountryName, CountryState } from "../../value-object";

export class Country{
    constructor(
        readonly name: CountryName,
        readonly abbreviation?: CountryAbbreviation,
        readonly code?: CountryCode,
        readonly state?: CountryState,
        readonly id?: CountryId,
    ){}
}