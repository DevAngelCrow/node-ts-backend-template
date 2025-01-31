import { CustomError } from "../..";

export class PeopleIdCountry {
  constructor(readonly value: number) {
    this.required()
  }

  private required() {
    if (!this.value) {
      throw CustomError.badRequest("The id country status is required");
    }
  }
}
