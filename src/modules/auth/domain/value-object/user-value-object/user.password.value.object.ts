import { CustomError } from "../../../../../shared/domain/errors/custom.error";

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
