import { CustomError } from "../..";

export class PeopleBirthdate {
  constructor(readonly value: Date) {
    this.required()
  }

  private required() {
    if (!this.value) {
      throw CustomError.badRequest("The field birthdate is required");
    }
  }
}
