import { CustomError } from "../../../../../shared/domain/errors/custom.error";

export class DistrictState {
  constructor(readonly value: boolean) {
    this.required()
  }

  private required() {
    if (this.value === undefined || this.value === null) {
      throw CustomError.badRequest("The field state is required");
    }
  }
}
