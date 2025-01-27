import { CustomError } from "../..";

export class UserPassword {
  constructor(readonly value: string) {
    this.required()
  }

  private required() {
    if (!this.value) {
      throw CustomError.badRequest("The password is required");
    }
  }
}
