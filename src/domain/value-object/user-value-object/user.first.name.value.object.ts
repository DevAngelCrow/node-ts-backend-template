import { CustomError } from "../..";

export class UserFirstName {
  constructor(readonly value: string) {
    this.required()
  }

  private required() {
    if (!this.value) {
      throw CustomError.badRequest("The field first name is required");
    }
  }
}
