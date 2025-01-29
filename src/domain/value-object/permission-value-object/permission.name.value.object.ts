import { CustomError } from "../..";

export class PermissionName {
  constructor(readonly value: string) {
    this.required()
  }

  private required() {
    if (!this.value) {
      throw CustomError.badRequest("The field name is required");
    }
  }
}
