import { CustomError } from "../..";

export class UserLastName {
  constructor(readonly value: string) {
    this.required()
  }

  private required() {
    if (!this.value) {
      throw CustomError.badRequest("The field last name is required");
    }
  }
}
