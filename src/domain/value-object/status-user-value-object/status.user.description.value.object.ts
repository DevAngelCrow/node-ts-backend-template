import { CustomError } from "../..";

export class StatusUserDescription {
  constructor(readonly value: string) {
    this.required()
  }

  private required() {
    if (!this.value) {
      throw CustomError.badRequest("The field description is required");
    }
  }
}
