import { CountryAbbreviation, CountryCode, CountryId, CountryName, CountryState } from "../../value-object";

export class Country{
    constructor(
        readonly name: CountryName,
        readonly abbreviation?: CountryAbbreviation,
        readonly code?: CountryCode,
        readonly state?: CountryState,
        readonly id?: CountryId,
    ){}


    public mapToPrimitives(){
        return {
            id: this.id?.value,
            name: this.name.value,
            abbreviation: this.abbreviation?.value,
            code: this.code?.value,
            state: this.state?.value 
        }
    }
}