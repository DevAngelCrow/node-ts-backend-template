import { CustomError } from "../../../../../shared/domain/errors/custom.error";

export class RolName {
  constructor(readonly value: string) {
    this.required()
  }

  private required() {
    if (!this.value) {
      throw CustomError.badRequest("The field nae is required");
    }
  }
}
