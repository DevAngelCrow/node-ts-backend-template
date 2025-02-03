import { CustomError } from "../..";

export class CountryState {
  constructor(readonly value: boolean | null) {
    this.required()
  }

  private required() {
    if (!this.value) {
      throw CustomError.badRequest("The field state is required");
    }
  }
}
