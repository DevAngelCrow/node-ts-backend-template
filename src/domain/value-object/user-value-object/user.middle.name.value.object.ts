import { CustomError } from "../..";

export class UserMiddleName {
  constructor(readonly value: string) {
    this.required()
  }

  private required() {
    if (!this.value) {
      throw CustomError.badRequest("The field middle name is required");
    }
  }
}
