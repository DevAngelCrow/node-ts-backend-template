import { CustomError } from "../..";

export class UserLastAccess {
  constructor(readonly value: Date) {
    this.required()
  }

  private required() {
    if (!this.value) {
      throw CustomError.badRequest("The field last name is required");
    }
  }
}
