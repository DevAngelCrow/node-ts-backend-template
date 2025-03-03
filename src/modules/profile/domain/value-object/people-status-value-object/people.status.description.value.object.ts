import { CustomError } from "../../../../../shared/domain/errors/custom.error";

export class PeopleStatusDescription {
  constructor(readonly value: string | null) {
    this.required()
  }

  private required() {
    if (!this.value) {
      throw CustomError.badRequest("The field description is required");
    }
  }
}
