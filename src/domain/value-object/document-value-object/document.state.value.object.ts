import { CustomError } from "../..";

export class DocumentState {
  constructor(readonly value: boolean) {
    this.required()
  }

  private required() {
    if (!this.value) {
      throw CustomError.badRequest("The field state is required");
    }
  }
}
