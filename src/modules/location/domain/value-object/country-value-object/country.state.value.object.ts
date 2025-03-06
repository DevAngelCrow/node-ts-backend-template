import { CustomError } from "../../../../../shared/domain/errors/custom.error";

export class CountryState {
  constructor(readonly value: boolean | null) {
    this.required()
  }

  private required() {
    if (this.value === null || this.value === undefined) {
      throw CustomError.badRequest("The field state is required");
    }
  }
}
