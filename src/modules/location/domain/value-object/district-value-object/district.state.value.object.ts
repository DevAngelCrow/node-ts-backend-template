import { CustomError } from "../../../../../shared/domain/errors/custom.error";

export class DistrictState {
  constructor(readonly value: boolean) {
    this.required()
  }

  private required() {
    if (!this.value) {
      throw CustomError.badRequest("The field state is required");
    }
  }
}
