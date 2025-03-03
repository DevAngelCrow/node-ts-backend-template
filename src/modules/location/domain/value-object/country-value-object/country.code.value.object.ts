import { CustomError } from "../../../../../shared/domain/errors/custom.error";

export class CountryCode {
  constructor(readonly value: string | null) {
    this.required()
  }

  private required() {
    if (!this.value) {
      throw CustomError.badRequest("The field code is required");
    }
  }
}
