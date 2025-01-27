import { CustomError } from "../..";

export class UserEmail {
  constructor(readonly value: string) {
    this.required()
  }

  private required() {
    if (!this.value) {
      throw CustomError.badRequest("The field email is required");
    }
  }
}
