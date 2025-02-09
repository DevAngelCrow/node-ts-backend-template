import { CustomError } from "../../../../../shared/domain/errors/custom.error";

export class PeopleMiddleName {
  constructor(readonly value: string) {
    this.required()
  }

  private required() {
    if (!this.value) {
      throw CustomError.badRequest("The field middle name is required");
    }
  }
}
