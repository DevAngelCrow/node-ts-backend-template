import { CustomError } from "../..";

export class PeopleFirstName {
  constructor(readonly value: string) {
    this.required()
  }

  private required() {
    if (!this.value) {
      throw CustomError.badRequest("The field first name is required");
    }
  }
}
