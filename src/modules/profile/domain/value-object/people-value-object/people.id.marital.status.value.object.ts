import { CustomError } from "../../../../../shared/domain/errors/custom.error";

export class PeopleIdMaritalStatus {
  constructor(readonly value: number) {
    this.required()
  }

  private required() {
    if (!this.value) {
      throw CustomError.badRequest("The field marital status is required");
    }
  }
}
