import { CustomError } from "../../../../../shared/domain/errors/custom.error";

export class DistrictName {
  constructor(readonly value: string) {
    this.required()
  }

  private required() {
    if (!this.value) {
      throw CustomError.badRequest("The field name is required");
    }
  }
}
