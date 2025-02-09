import { CustomError } from "../../../../../shared/domain/errors/custom.error";

export class PeopleIdGender {
  constructor(readonly value: number) {
    this.required()
  }

  private required() {
    if (!this.value) {
      throw CustomError.badRequest("The field id gender is required");
    }
  }
}
