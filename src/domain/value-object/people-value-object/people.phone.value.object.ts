import { CustomError } from "../..";

export class PeoplePhone {
  constructor(readonly value: string) {
    this.required()
  }

  private required() {
    if (!this.value) {
      throw CustomError.badRequest("The field phone number is required");
    }
  }
}
