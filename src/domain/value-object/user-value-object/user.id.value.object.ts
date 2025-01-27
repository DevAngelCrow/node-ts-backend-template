import { CustomError } from "../../index";

export class UserId {
  constructor(readonly value: number) {
    this.required();
  }

  private required() {
    if (!this.value) {
      throw CustomError.badRequest("The field is required");
    }
  }
}
