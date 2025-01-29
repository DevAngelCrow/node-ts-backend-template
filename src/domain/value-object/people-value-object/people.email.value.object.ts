import { CustomError } from "../..";

export class PeopleEmail {
  constructor(readonly value: string) {
    this.required()
  }

  private required() {
    if (!this.value) {
      throw CustomError.badRequest("The field email is required");
    }
  }
}
