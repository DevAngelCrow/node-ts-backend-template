import { CustomError } from "../..";

export class CountryAbbreviation {
  constructor(readonly value: string | null) {
    this.required()
  }

  private required() {
    if (!this.value) {
      throw CustomError.badRequest("The field abbreviation is required");
    }
  }
}
