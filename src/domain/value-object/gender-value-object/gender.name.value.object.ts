import { CustomError } from "../..";

export class GenderName {
  constructor(readonly value: string) {
    this.required()
  }

  private required() {
    if (!this.value) {
      throw CustomError.badRequest("The field name is required");
    }
  }
}
